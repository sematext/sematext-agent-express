const stMonitor = require('./metrics/stMonitor')
const stLogger = require('./logs/stLogger')
const stHttpLoggerMiddleware = require('./logs/stHttpLoggerMiddleware')

const sematextAgentExpress = () => {
  const monitoringToken = process.env.SPM_TOKEN
  const logsToken = process.env.LOGS_TOKEN

  if (!monitoringToken && !logsToken) {
    console.log('Please add Monitoring and Logs Tokens')
    return {}
  } else if (!monitoringToken && logsToken) {
    console.log('You have added only a Logs Token')
    return {
      stMonitor: { start: () => console.log('Please configure your Monitoring Token') },
      stLogger: stLogger(),
      stHttpLoggerMiddleware: stHttpLoggerMiddleware()
    }
  } else if (monitoringToken && !logsToken) {
    console.log('You have added only a Monitoring Token\nPlease configure your Logs Token')
    return {
      stMonitor: stMonitor()
    }
  }

  console.log('You have added both Monitoring Token and Logs Tokens')
  return {
    stMonitor: stMonitor(),
    stLogger: stLogger(),
    stHttpLoggerMiddleware: stHttpLoggerMiddleware()
  }
}

module.exports = sematextAgentExpress
