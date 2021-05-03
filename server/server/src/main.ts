import fs from 'fs'
import cors from 'cors'
import express, { response } from 'express'
import fileUpload from 'express-fileupload'

import { logger } from './utils/logger'
import { WORDS, LOCAL_SERVER_PORT } from './utils/constants'
import { checkSignatureList, compareSignatureList, getWordForProofOfWork, addToQueue, checkIdInQueue, sendPowToServers, validateProofOfWork, sendNewPixelToAllInstances } from './blockchain'
import { sendNewPixelRequest, getStoredPixelsFromRedis } from './server'
import { addPixelToRegistry } from './database'

const app = express()

app.use(express.json({
  limit: '50mb'
}))
app.use(fileUpload())
app.use(express.static('public'))
app.use(cors())

console.clear()

app.get('/status', (_, response) => {
  logger.info('Request to send the status of the server; OK')
  response.sendStatus(200)
})

// New petition to change the pixel to the leader, this method should only be used for and by the
// leader server.
app.post('/newPixel', async (request, response) => {
  logger.info('Request on the leader to register a new pixel on the network 🎉')
  const signatureList = request.body.signatureList
  const isValid = await checkSignatureList(signatureList)
  if (isValid) {
    // Get the word for the request instance to do the proof of work
    const word = await getWordForProofOfWork()
    response.send(word)
    // Send the word to the request instance and toss the petition to the queue of work
    addToQueue({
      serverId: request.body.serverId,
      pixelColor: request.body.pixelColor,
      pixelX: request.body.pixelX,
      pixelY: request.body.pixelY,
      word: word
    })
  } else {
    logger.info('The request to register a new pixel on the network has been marked as invalid 😥')
    response.sendStatus(400)
  }
})



app.post('/finishedProofOfWork', async (request, response) => {
  logger.info('Request on the leader to evaluate a proof of work')
  const workInformation = checkIdInQueue(request.body.serverId)
  if (workInformation) {
    logger.info('Writting the file to a temporal place')
    fs.writeFileSync('./pow.txt', Buffer.from(request.body.pow.data))
    logger.info('Finished')
    const isValid = await sendPowToServers(request.body.serverId, workInformation.word)
    if (isValid) {
      response.sendStatus(200)
      sendNewPixelToAllInstances(workInformation)
    } else {
      logger.warn('The proof of work is not valid 👻')
      response.sendStatus(400)
    }
  } else {
    logger.warn('Server not in the queue of work!')
    response.sendStatus(400)
  }
})

// ================================= Non leader methods ==========================================

app.get('/getStoredPixels', async (req, res) => {
  logger.info('Getting stored pixels from redis 🎦')
  const values = await getStoredPixelsFromRedis()
  logger.info('Los valores conseguidos fueron ')
  //console.log(values)
  res.send({ values: values });
})


app.get('/randomNumber', (request, response) => {
  logger.info('Request to get a random number from this server')
  response.send({
    number: Math.round(Math.random() * 100)
  })
})

app.post('/sendNewPixel', async (request, response) => {
  logger.info('Request to reigster a new pixel to the leader')
  sendNewPixelRequest(request.body)
  response.sendStatus(200)
})

// Post petition to get the validity of all of the signatures sent from the leader with this server.
app.post('/verifySignatures', async (request, response) => {
  logger.info('Post request to compare some signatures with the signatures on this instance')
  console.log(request.body.signatureList)
  // Verificar que coincidan las firmas de la imagen
  const validity = await compareSignatureList(request.body.signatureList)
  logger.warn(`The validity of the signatures were ${validity}`)
  response.sendStatus(validity ? 200 : 400)
})

// Peticion que devuelve una palabra aleatoria del arreglo de palabras predefinidas
app.get('/word', (_, response) => {
  logger.info('Request to get the selected word')
  const selectedWord = WORDS[Math.floor(Math.random() * WORDS.length)]
  logger.info(`The selected word is ${selectedWord}`)
  response.send({
    selectedWord: selectedWord
  })
})

// Check the file has been written correctly from the instance
app.post('/checkProofOfWork', async (request, response) => {
  logger.info('Request to check the proof of work of some instance')
  logger.info('Writting the file to a temporal place')
  fs.writeFileSync('./pow.txt', Buffer.from(request.body.pow.data))
  logger.info('Finished')
  const validity = await validateProofOfWork(request.body.word)
  logger.warn(`The validity of the proof of work is ${validity}`)
  response.sendStatus(validity ? 200 : 400)
})

app.post('/setPixel', (request, response) => {
  logger.info('Request to set a new pixel! 😲')
  const workInformation = request.body.workInformation
  if (workInformation) {
    addPixelToRegistry({
      signature: request.body.signature,
      pixelX: workInformation.pixelX,
      pixelY: workInformation.pixelY,
      r: workInformation.pixelColor[0],
      g: workInformation.pixelColor[1],
      b: workInformation.pixelColor[2],
      a: workInformation.pixelColor[3]
    })
    response.sendStatus(200)
  } else {
    logger.error('Something went wrong with the writing of the pixel. 😢')
    response.sendStatus(400)
  }
})

app.listen(LOCAL_SERVER_PORT, () => {
  logger.info(`Instance server listening at port ${LOCAL_SERVER_PORT}`)
})