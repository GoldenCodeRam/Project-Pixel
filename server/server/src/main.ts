import express from 'express'

import { logger } from './utils/Logger'

const app = express()
const port = 8080

console.clear()

app.get('/status', (_, response) => {
  response.sendStatus(200)
})

app.listen(port, () => {
  logger.info(`Instance server listening at port ${port}`)
})
