// import winston from 'winston'

// const { combine, timestamp, json, prettyPrint } = winston.format

// const Logger = winston.createLogger({
//   level: 'silly',
//   format: combine(timestamp(), json(), prettyPrint()),
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({ filename: 'combined.log' }),
//   ],
// })

// export default Logger

import winston from 'winston'

const { combine, timestamp, json, prettyPrint } = winston.format

const Logger = winston.createLogger({
  level: 'silly',
  format: combine(
    timestamp(),
    json(),
    winston.format((info) => {
      if (!info.userId) {
        info.userId = 'unknown'
      }
      return info
    })(),
    prettyPrint()
  ),
  defaultMeta: { userId: 'unknown' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})

export default Logger
