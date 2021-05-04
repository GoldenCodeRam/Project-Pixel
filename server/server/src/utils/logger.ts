import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, printf } = format

const timezone = () => {
  return new Date().toLocaleDateString(
    'es-CO',
    {
      timeZone: 'America/Bogota',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
}

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${level} [${timestamp} : ${label}]\n${message}`
})

const logger = createLogger({
  format: combine(
    label({ label: `Instance Server 🤖 - Server ${process.env.PORT}` }),
    timestamp({
      format: timezone
    }),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.Http({
      host: process.env.LOGGING_SERVER as string,
      port: parseInt(process.env.LOGGING_SERVER_PORT as string),
      path: '/logging'
    })
  ]
})

const serverLogger = createLogger({
  format: combine(
    label({ label: `Server 🧰 - Server ${process.env.PORT}` }),
    timestamp({
      format: timezone
    }),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.Http({
      host: process.env.LOGGING_SERVER as string,
      port: parseInt(process.env.LOGGING_SERVER_PORT as string),
      path: '/logging'
    })
  ]
})

const blockchainLogger = createLogger({
  format: combine(
    label({ label: `Blockchain 🔗 - Server ${process.env.PORT}` }),
    timestamp({
      format: timezone
    }),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.Http({
      host: process.env.LOGGING_SERVER as string,
      port: parseInt(process.env.LOGGING_SERVER_PORT as string),
      path: '/logging'
    })
  ]
})

const databaseLogger = createLogger({
  format: combine(
    label({ label: `Database 🗃️ - Server ${process.env.PORT}` }),
    timestamp({
      format: timezone
    }),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.Http({
      host: process.env.LOGGING_SERVER as string,
      port: parseInt(process.env.LOGGING_SERVER_PORT as string),
      path: '/logging'
    })
  ]
})

export {
  logger,
  blockchainLogger,
  databaseLogger,
  serverLogger
}
