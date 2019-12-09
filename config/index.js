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

if (process.env.REGION === 'EU') {
  process.env['SPM_RECEIVER_URL'] = 'https://spm-receiver.eu.sematext.com/receiver/v1'
  process.env['EVENTS_RECEIVER_URL'] = 'https://event-receiver.eu.sematext.com'
  process.env['LOGSENE_RECEIVER_URL'] = 'https://logsene-receiver.eu.sematext.com'
}
