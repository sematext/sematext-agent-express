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

const stMonitor = require('./metrics/stMonitor')
const stLogger = require('./logs/stLogger')
const stHttpLoggerMiddleware = require('./logs/stHttpLoggerMiddleware')

const sematextAgentExpress = () => {
  const monitoringToken = process.env.MONITORING_TOKEN
  const logsToken = process.env.LOGS_TOKEN
  const infraToken = process.env.INFRA_TOKEN

  if (!(monitoringToken && infraToken) && !logsToken) {
    console.log('Please add MONITORING_TOKEN, INFRA_TOKEN, and LOGS_TOKEN')
    return {}
  } else if (!(monitoringToken && infraToken) && logsToken) {
    console.log('You have added a LOGS_TOKEN')
    return {
      stMonitor: { start: () => console.log('Please add a MONITORING_TOKEN and INFRA_TOKEN if you want to configure shipping metrics') },
      stLogger: stLogger(),
      stHttpLoggerMiddleware: stHttpLoggerMiddleware()
    }
  } else if ((monitoringToken && infraToken) && !logsToken) {
    console.log('You have added a MONITORING_TOKEN and INFRA_TOKEN\nPlease add a LOGS_TOKEN if you want to configure shipping logs')
    return {
      stMonitor: stMonitor()
    }
  }

  return {
    stMonitor: stMonitor(),
    stLogger: stLogger(),
    stHttpLoggerMiddleware: stHttpLoggerMiddleware()
  }
}

module.exports = sematextAgentExpress
