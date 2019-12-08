/*
 * @copyright Copyright (c) Sematext Group, Inc. - All Rights Reserved
 *
 * @licence SPM for NodeJS is free-to-use, proprietary software.
 * THIS IS PROPRIETARY SOURCE CODE OF Sematext Group, Inc. (Sematext)
 * This source code may not be copied, reverse engineered, or altered for any purpose.
 * This source code is to be used exclusively by users and customers of Sematext.
 * Please see the full license (found in LICENSE in this distribution) for details on its license and the licenses of its dependencies.
 */

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
