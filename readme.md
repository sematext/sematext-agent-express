# Sematext Agent Express

[![Build Status](https://travis-ci.org/sematext/sematext-agent-express.svg?branch=master)](https://travis-ci.org/sematext/sematext-agent-express)

[![NPM](https://nodei.co/npm/sematext-agent-express.png)](https://nodei.co/npm/sematext-agent-express/)

This is the Express.js monitoring and logging agent for Sematext Cloud.

The following information is collected and shipped to Sematext Cloud / Enterprise:

- OS Metrics (CPU / Mem)
- Process Memory
- Process Metrics
- EventLoop Metrics
- Garbage Collector Metrics
- Web Server Metrics:
  - request rate
  - error rate
  - response times
  - content size
- HTTP Logs per API endpoint:
  - response times
  - content size
  - URL
  - status
  - method
- Custom Logs:
  - Instead of using `console.log` ship all logs directly to Sematext Logs with `stLogger`

## Installation

Install the package from the NPM registry.

```bash
npm i sematext-agent-express
```

Sign up to Sematext [here](https://apps.sematext.com/ui/registration).

## Configure Environment

Make sure to configure your ENVIRONMENT variables before adding `sematext-agent-express`. You can do this either by exporting the variables to your environment or by using `dotenv`. We suggest you use `dotenv`.

### Export env vars

If you are using the US region of Sematext Cloud:

```bash
export SPM_TOKEN=<YOUR_MONITORING_TOKEN>
export LOGS_TOKEN=<YOUR_LOGS_TOKEN>
```

If you are using the EU region of Sematext Cloud:

```bash
export SPM_RECEIVER_URL=https://spm-receiver.eu.sematext.com/receiver/v1
export EVENTS_RECEIVER_URL=https://event-receiver.eu.sematext.com
export LOGSENE_RECEIVER_URL=https://logsene-receiver.eu.sematext.com
export SPM_TOKEN=<YOUR_MONITORING_TOKEN>
export LOGS_TOKEN=<YOUR_LOGS_TOKEN
```

### Use dotenv

```bash
npm i dotenv
```

Create a `.env` file in the root of your project.

Add this code if you are using the US region of Sematext Cloud:

```
SPM_TOKEN=<YOUR_MONITORING_TOKEN>
LOGS_TOKEN=<YOUR_LOGS_TOKEN>
```

Add this code if you are using the EU region of Sematext Cloud:

```
SPM_RECEIVER_URL=https://spm-receiver.eu.sematext.com/receiver/v1
EVENTS_RECEIVER_URL=https://event-receiver.eu.sematext.com
LOGSENE_RECEIVER_URL=https://logsene-receiver.eu.sematext.com
SPM_TOKEN=<YOUR_MONITORING_TOKEN>
LOGS_TOKEN=<YOUR_LOGS_TOKEN
```

## Configure Agent

Make sure to load the environment variables at the top of your JavaScript entry point file. Then require `sematext-agent-express`.

The Agent has 3 parts:

- `stMonitor` - Monitors metrics and sends to Sematext Monitoring
- `stLogger` - A logger based on `winston`, that will send logs directly to Sematext Logs
- `stHttpLoggerMiddleware` - Express.js middleware function that will send all HTTP endpoint logs to Sematext Logs

### Usage

```javascript
// Load env vars
require('dotenv').config()

// require all agents
const { stMonitor, stLogger, stHttpLoggerMiddleware } = require('sematext-agent-express')

// Start monitoring metrics
stMonitor.start()

// ...

// At the top of your routes add the stHttpLoggerMiddleware to send HTTP logs to Sematext
const express = require('express')
const app = express()
app.use(stHttpLoggerMiddleware)

// ...

// Use the stLogger to send all types of logs directly to Sematext
app.get('/api', (req, res, next) => {
  stLogger.info('Hello World.')
  stLogger.error('Some error.')
  res.status(200).send('Hello World.')
})
```

You can use all parts of the Agent of use them separately. It's all up to you.

## Result
The Agents will capture both metrics, logs, and HTTP logs per API endpoint.

### Metrics

[](https://cdn.sematext.com/images/sample-nodejs-metrics.png)

### Logs

[](https://cdn.sematext.com/images/sample-nodejs-logs.png)

## Troubleshooting

Check out our [documentation](https://sematext.com/docs/integration/node.js/) for more information.

## Built with

- [spm-agent-nodejs](https://github.com/sematext/spm-agent-nodejs)
- [winston](https://github.com/winstonjs/winston)
- [winston-logsene](https://github.com/sematext/winston-logsene)
- [morgan](https://github.com/expressjs/morgan)
- [morgan-json](https://github.com/indexzero/morgan-json)

## LICENSE

Apache 2 - see the [LICENSE](./LICENSE) file.
