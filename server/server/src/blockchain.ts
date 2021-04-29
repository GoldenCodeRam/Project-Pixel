import fs from 'fs'
import axios from 'axios'
import readline from 'readline'
import crypto from 'crypto'

import { addPixelToRegistry, getStoredPixels } from './database'
import { WorkInformation } from './interfaces/WorkInformation'

import { SERVER_PORTS, LEADER_PORT, SERVER_GATEWAY, WORDS } from './utils/constants'

import { blockchainLogger as logger } from './utils/logger'

export {
  getWordForProofOfWork,
  checkSignatureList,
  compareSignatureList,
  addToQueue,
  checkIdInQueue,
  sendPowToServers,
  validateProofOfWork,
  sendNewPixelToAllInstances
}

let workQueue: Array<WorkInformation> = []

async function getWordForProofOfWork (): Promise<string> {
  logger.info('Instance passed the validation of signatures 🍾')
  logger.info('Getting a word for it to make the proof of work')
  const votedWords = []
  for (const port of SERVER_PORTS) {
    if (port === LEADER_PORT) {
      const selectedWord = WORDS[Math.floor(Math.random() * WORDS.length)]
      votedWords.push(selectedWord)
      continue
    }
    const response = await axios.get(`http://${SERVER_GATEWAY}:${port}/word`).catch((_) => {
      logger.error(`Error getting the word from port: ${port}`)
    })
    if (response) {
      votedWords.push(response.data.selectedWord as string)
    }
  }

  const votes: any = {}
  let mostVotedWord = votedWords[0]
  votedWords.forEach((word) => { votes[word] = (votes[word] || 0) + 1 })
  votedWords.forEach((word) => {
    if (votes[word] > votes[mostVotedWord]) {
      mostVotedWord = word
    }
  })
  console.log(`The most voted word was ${mostVotedWord}`)
  return mostVotedWord
}

async function checkSignatureList (signatureList: Array<string>): Promise<Boolean> {
  logger.info('Checking signatures to validate a new block')
  let votes = 0
  for (const port of SERVER_PORTS) {
    if (port === LEADER_PORT) {
      const validity = await compareSignatureList(signatureList)
      logger.warn(`The validity of the signatures were ${validity}`)
      votes += validity ? 1 : 0
      continue
    }
    const response = await axios.post(`http://${SERVER_GATEWAY}:${port}/verifySignatures`, {
      signatureList: signatureList
    }).catch((error) => {
      if (error.response.status === 400) {
        logger.warn(`The server on port ${port} marked the petition as invalid`)
      } else {
        logger.error(`Error getting the signature check from port: ${port}`)
      }
    })

    if (response) {
      logger.warn(`The server on port ${port} marked the petition as valid`)
      votes += response.status === 200 ? 1 : 0
    }
  }
  console.log(`The votes approving the signature list are ${votes}`)
  console.log(`The votes needed to pass the check must be at least ${Math.round(SERVER_PORTS.length / 2)}`)
  return votes >= Math.round(SERVER_PORTS.length / 2)
}

async function compareSignatureList (signatureList: Array<string>): Promise<Boolean> {
  logger.info('Comparing signatures from the ones of this server')
  const storedPixels = await getStoredPixels()

  if (signatureList.length !== storedPixels.length) {
    // First check: If the list of signatures and stored pixels is not the same, return
    return false
  } else {
    // Second check: If the stored pixels have all of the signatures of the instance
    let hasSignature = true
    for (const storedPixel of storedPixels) {
      hasSignature = false
      for (const signature of signatureList) {
        if (signature === storedPixel.signature) {
          hasSignature = true
        }
      }
      if (!hasSignature) {
        return false
      }
    }
    return hasSignature
  }
}

function addToQueue (information: WorkInformation) {
  workQueue.push(information)
}

function checkIdInQueue (serverId: number): WorkInformation | undefined {
  for (const work of workQueue) {
    if (work.serverId === serverId) {
      workQueue = workQueue.filter((value) => {
        return value !== work
      })
      return work
    }
  }
  return undefined
}

async function sendPowToServers (serverId: number, word: string): Promise<Boolean> {
  logger.info('Checking proof of work to validate a new block with all instances')
  let votes = 0
  for (const port of SERVER_PORTS) {
    if (port === LEADER_PORT) {
      const validity = await validateProofOfWork(word)
      logger.warn(`The validity of the proof of work is ${validity}`)
      votes += validity ? 1 : 0
      continue
    } else if (port !== serverId) {
      const response = await axios.post(`http://${SERVER_GATEWAY}:${port}/checkProofOfWork`, {
        word: word,
        pow: fs.readFileSync('./pow.txt')
      }).catch((error) => {
        if (error.response.status === 400) {
          logger.warn(`The server on port ${port} marked the proof of work as invalid`)
        } else {
          logger.error(`Error getting the proof of work check from port: ${port}`)
        }
      })

      if (response) {
        logger.warn(`The server on port ${port} marked the proof of work as valid`)
        votes += 1
      }
    }
  }
  console.log(`The votes approving the proof of work are ${votes}`)
  console.log(`The votes needed to pass the check must be at least ${Math.round(SERVER_PORTS.length / 2)}`)
  return votes >= Math.round(SERVER_PORTS.length / 2)
}

async function validateProofOfWork (word: string): Promise<Boolean> {
  logger.info('Validating proof of work')
  let counter = 0
  const readInterface = readline.createInterface({
    input: fs.createReadStream('./pow.txt'),
    crlfDelay: Infinity
  })

  for await (const line of readInterface) {
    if (line !== word) {
      return false
    }
    counter++
  }
  return counter === 50000
}

async function sendNewPixelToAllInstances (workInformation: WorkInformation) {
  logger.info('Sending the new pixel to all instances')
  const newPixelSignature = await getHashNumberFromServers()
  console.log(newPixelSignature)

  for (const port of SERVER_PORTS) {
    if (port === LEADER_PORT) {
      addPixelToRegistry({
        signature: newPixelSignature,
        pixelX: workInformation.pixelX,
        pixelY: workInformation.pixelY,
        r: workInformation.pixelColor[0],
        g: workInformation.pixelColor[1],
        b: workInformation.pixelColor[2],
        a: workInformation.pixelColor[3]
      })
      continue
    }
    const response = await axios.post(`http://${SERVER_GATEWAY}:${port}/setPixel`, {
      signature: newPixelSignature,
      workInformation: workInformation
    }).catch((_) => {
      logger.error(`The server on port ${port} couldn't set the new pixel!`)
    })

    if (response) {
      logger.info(`New pixel registered on ${port} 🥳🎉`)
    }
  }
}

async function getHashNumberFromServers (): Promise<string> {
  logger.info('Getting the number for the hash function from all servers')
  const numbers: Array<number> = []
  for (const port of SERVER_PORTS) {
    if (port === LEADER_PORT) {
      numbers.push(Math.round(Math.random() * 100))
      continue
    }
    const response = await axios.get(`http://${SERVER_GATEWAY}:${port}/randomNumber`).catch((_) => {
      logger.error(`The server on port ${port} couldn't send the random number for the signature!`)
    })

    if (response) {
      numbers.push(response.data.number)
    }
  }
  logger.info('Numbers got:')
  console.log(numbers)
  const hash = crypto.createHash('sha256')
  const numberString = numbers.join('')
  hash.update(numberString)
  return hash.digest('hex')
}
