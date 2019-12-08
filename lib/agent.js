/*
 * @copyright Copyright (c) Sematext Group, Inc. - All Rights Reserved
 *
 * @licence SPM for NodeJS is free-to-use, proprietary software.
 * THIS IS PROPRIETARY SOURCE CODE OF Sematext Group, Inc. (Sematext)
 * This source code may not be copied, reverse engineered, or altered for any purpose.
 * This source code is to be used exclusively by users and customers of Sematext.
 * Please see the full license (found in LICENSE in this distribution) for details on its license and the licenses of its dependencies.
 */

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
