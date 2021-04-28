import express from 'express'
import cors from 'cors'

import { logger } from './utils/Logger'

const app = express()
const port = 8080

console.clear()

app.use(express.static('public'))
app.use(cors())

app.post('/image', (request, response) => {
  logger.info('Post request to upload the pixelart image')
  response.sendStatus(200)
})

app.get('/status', (_, response) => {
  logger.info('Request to send the status of the server; OK')
  response.sendStatus(200)
})

app.listen(port, () => {
  logger.info(`Instance server listening at port ${port}`)
})
