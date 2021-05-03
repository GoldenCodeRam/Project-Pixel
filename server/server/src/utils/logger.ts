import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, printf } = format

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${level} [${timestamp} : ${label}]\n${message}`
})

const logger = createLogger({
  format: combine(
    format.colorize(),
    label({ label: 'Instance Server 🤖' }),
    timestamp({
      format: 'hh:mm:ss A'
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
    format.colorize(),
    label({ label: 'Server 🧰' }),
    timestamp({
      format: 'hh:mm:ss A'
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
    format.colorize(),
    label({ label: 'Blockchain 🔗' }),
    timestamp({
      format: 'hh:mm:ss A'
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
    format.colorize(),
    label({ label: 'Database 🗃️' }),
    timestamp({
      format: 'hh:mm:ss A'
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
