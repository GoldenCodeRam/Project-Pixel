import fs from 'fs'
import axios from 'axios'
import { getStoredPixels } from './database'

import { LEADER_PORT, SERVER_GATEWAY } from './utils/constants'
import { serverLogger as logger } from './utils/logger'

export {
  sendNewPixelRequest
}

async function sendNewPixelRequest (requestBody: any) {
  const storedPixels = await getStoredPixels()
  const signatureList = []
  for (const storedPixel of storedPixels) {
    signatureList.push(storedPixel.signature)
  }

  const response = await axios.post(`http://${SERVER_GATEWAY}:${LEADER_PORT}/newPixel`, {
    serverId: process.env.PORT,
    pixelX: requestBody.pixelX,
    pixelY: requestBody.pixelY,
    pixelColor: requestBody.pixelColor,
    signatureList: signatureList
  }).catch((_) => {
    logger.error('Something went wrong sending the new pixel request to the leader')
  })

  if (response) {
    logger.info(`The word to make the proof of work with is: ${response.data}`)
    makeProofOfWork(response.data)
  }
}

async function makeProofOfWork (word: string) {
  logger.info('Making the proof of work...')
  for (let i = 0; i < 50000; i++) {
    await fs.promises.appendFile('./pow.txt', `${word}\n`)
  }
  logger.info('Proof of work finished!')

  await axios.post(`http://${SERVER_GATEWAY}:${LEADER_PORT}/finishedProofOfWork`, {
    serverId: process.env.PORT,
    pow: fs.readFileSync('./pow.txt')
  })

  fs.rmSync('./pow.txt')
}