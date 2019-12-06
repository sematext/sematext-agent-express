const winston = require('winston')
const morgan = require('morgan')
const json = require('morgan-json')
const format = json({
  method: ':method',
  url: ':url',
  status: ':status',
  contentLength: ':res[content-length]',
  responseTime: ':response-time'
})
const Logsene = require('winston-logsene')
const createStLogger = (logsToken, logsReceiverUrl, logsType) => {
  return winston.createLogger({
    transports: [new Logsene({
      token: logsToken,
      level: 'info',
      type: logsType,
      url: logsReceiverUrl
    })]
  })
}

/**
 * Agent Constructor
 */
const sematextAgentExpress = () => {
  const monitoringToken = process.env.SPM_TOKEN
  const logsToken = process.env.LOGS_TOKEN
  const logsReceiverUrl = process.env.LOGSENE_RECEIVER_URL || 'https://logsene-receiver.sematext.com/_bulk'

  if (!monitoringToken && !logsToken) {
    console.log('Please add Monitoring and Logs Tokens')
    return {}
  }
  if (!monitoringToken && logsToken) {
    console.log('You have added only a Logs Token')
    return {
      stMonitor: { start: () => console.log('Please configure your Monitoring Token') },
      stLogger: stLogger(),
      stHttpLogger: stHttpLogger()
    }
  }
  if (monitoringToken && !logsToken) {
    console.log('You have added only a Monitoring Token\nPlease configure your Logs Token')
    return {
      stMonitor: stMonitor()
    }
  }
  if (monitoringToken && logsToken) {
    console.log('You have added both Monitoring Token and Logs Tokens')
    return {
      stMonitor: stMonitor(),
      stLogger: stLogger(),
      stHttpLogger: stHttpLogger()
    }
  }

  function stMonitor () {
    return { start: () => require('spm-agent-nodejs') }
  }

  function stLogger () {
    return createStLogger(logsToken, logsReceiverUrl, 'LOGS')
  }

  function stHttpLogger () {
    const logger = createStLogger(logsToken, logsReceiverUrl, 'HTTP_LOGS')
    return morgan(format, {
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
  }
}

module.exports = sematextAgentExpress()
