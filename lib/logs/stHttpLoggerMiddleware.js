/*
 * @copyright Copyright (c) Sematext Group, Inc. - All Rights Reserved
 *
 * See the NOTICE file distributed with this work for additional information
 * regarding copyright ownership.
 *
 * Sematext licenses sematext-agent-express to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 *
 * sematext-agent-express is free-to-use, proprietary software.
 * THIS IS PROPRIETARY SOURCE CODE OF Sematext Group, Inc. (Sematext)
 * This source code may not be copied, reverse engineered, or altered for any purpose.
 * This source code is to be used exclusively by users and customers of Sematext.
 * Please see the full license (found in LICENSE in this distribution) for details on its license and the licenses of its dependencies.
 */

const morgan = require('morgan')
const format = buildMorganFormat({
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

const buildMorganFormat = (format, opts) => {
  opts = opts || {};

  var keys = Object.keys(format);
  var stringify = opts.stringify !== false ? 'JSON.stringify' : '';
  var js = '  "use strict"\n  return ' + stringify + '({' + keys.map(function (key, i) {
    var assignment = '\n    "' + key + '": "' + format[key].replace(/:([-\w]{2,})(?:\[([^\]]+)\])?/g, function (_, name, arg) {
      var tokenArguments = 'req, res';
      var tokenFunction = 'tokens[' + String(JSON.stringify(name)) + ']';

      if (arg !== undefined) {
        tokenArguments += ', ' + String(JSON.stringify(arg));
      }

      return '" + (' + tokenFunction + '(' + tokenArguments + ') || "-") + "';
    }) + '"';

    return assignment;
  }) + '\n  })';

  return new Function('tokens, req, res', js);
}

const stHttpLoggerMiddleware = () =>
  createStHttpLoggerMiddleware(
    createStLogger(logsToken, logsReceiverUrl, 'HTTP_LOGS')
  )

module.exports = stHttpLoggerMiddleware
