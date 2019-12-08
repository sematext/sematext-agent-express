const morgan = require('morgan')
const json = require('morgan-json')
const format = json({
  method: ':method',
  url: ':url',
  status: ':status',
  contentLength: ':res[content-length]',
  responseTime: ':response-time'
})
const createStLogger = require('./createStLogger')
const logsToken = process.env.LOGS_TOKEN
const logsReceiverUrl = process.env.LOGSENE_RECEIVER_URL || 'https://logsene-receiver.sematext.com/_bulk'

const createStHttpLoggerMiddleware = (logger) =>
  morgan(format, {
    stream: {
      write: (message) => {
        const { method, url, status, contentLength, responseTime } = JSON.parse(message)
        logger.info('HTTP_LOG', {
          method,
          url,
          status: Number(status),
          contentLength,
          responseTime: Number(responseTime)
        })
      }
    }
  })

const stHttpLoggerMiddleware = () => createStHttpLoggerMiddleware(createStLogger(logsToken, logsReceiverUrl, 'HTTP_LOGS'))
module.exports = stHttpLoggerMiddleware
