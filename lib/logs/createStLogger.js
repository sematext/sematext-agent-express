const winston = require('winston')
const Logsene = require('winston-logsene')
const createStLogger = (logsToken, logsReceiverUrl, logsType) =>
  winston.createLogger({
    transports: [new Logsene({
      token: logsToken,
      level: 'info',
      type: logsType,
      url: logsReceiverUrl
    })]
  })
module.exports = createStLogger
