/*
 * @copyright Copyright (c) Sematext Group, Inc. - All Rights Reserved
 *
 * @licence SPM for NodeJS is free-to-use, proprietary software.
 * THIS IS PROPRIETARY SOURCE CODE OF Sematext Group, Inc. (Sematext)
 * This source code may not be copied, reverse engineered, or altered for any purpose.
 * This source code is to be used exclusively by users and customers of Sematext.
 * Please see the full license (found in LICENSE in this distribution) for details on its license and the licenses of its dependencies.
 */

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

const stHttpLoggerMiddleware = () =>
  createStHttpLoggerMiddleware(
    createStLogger(logsToken, logsReceiverUrl, 'HTTP_LOGS')
  )

module.exports = stHttpLoggerMiddleware
