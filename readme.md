# Sematext Agent Express

[![Build Status](https://travis-ci.org/sematext/sematext-agent-express.svg?branch=master)](https://travis-ci.org/sematext/sematext-agent-express)

[![NPM](https://nodei.co/npm/sematext-agent-express.png)](https://nodei.co/npm/sematext-agent-express/)

This is the Express.js monitoring and logging agent for [Sematext](https://sematext.com/). The following data is collected and shipped to Sematext [Cloud](https://sematext.com/cloud/) / [Enterprise](https://sematext.com/enterprise/):

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

## Quickstart 

1. Sign up to [Sematext for free](https://apps.sematext.com/ui/registration)  
2. [Create a Node.js Monitoring App](https://apps.sematext.com/ui/integrations) and copy the Monitoring App Token
3. [Create a Logs App](https://apps.sematext.com/ui/integrations) and copy the Logs App Token
4. Install the `sematext-agent-express` npm module
4. Configure environment variables
5. Run the agent using the App tokens provided for your Monitoring and Logs Apps

## Create Apps in Sematext

After you sign up to Sematext [here](https://apps.sematext.com/ui/registration), you need to create Apps to store metrics and logs data.

1. Create a [Logs App](https://sematext.com/docs/logs/quick-start/)
2. Create a [Monitoring App](https://sematext.com/docs/monitoring/quick-start/)

## Installation

Install the package from the NPM registry.

```bash
npm i sematext-agent-express
```

## Configure Environment

Make sure to configure your ENVIRONMENT variables before adding `sematext-agent-express`. You can do this either by exporting the variables to your environment or by using `dotenv`. We suggest you use `dotenv`.

### Export env vars

If you are using the US region of Sematext Cloud:

```bash
export MONITORING_TOKEN=<YOUR_MONITORING_TOKEN>
export LOGS_TOKEN=<YOUR_LOGS_TOKEN>
export INFRA_TOKEN=<YOUR_INFRA_TOKEN>
```

If you are using the EU region of Sematext Cloud:

```bash
export REGION=EU
export MONITORING_TOKEN=<YOUR_MONITORING_TOKEN>
export LOGS_TOKEN=<YOUR_LOGS_TOKEN>
export INFRA_TOKEN=<YOUR_INFRA_TOKEN>
```

### Use dotenv

```bash
npm i dotenv
```

Create a `.env` file in the root of your project.

Add this code if you are using the US region of Sematext Cloud:

```
MONITORING_TOKEN=<YOUR_MONITORING_TOKEN>
LOGS_TOKEN=<YOUR_LOGS_TOKEN>
INFRA_TOKEN=<YOUR_INFRA_TOKEN>
```

Add this code if you are using the EU region of Sematext Cloud:

```
REGION=EU
MONITORING_TOKEN=<YOUR_MONITORING_TOKEN>
LOGS_TOKEN=<YOUR_LOGS_TOKEN>
INFRA_TOKEN=<YOUR_INFRA_TOKEN>
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

![](https://cdn.sematext.com/images/sample-nodejs-metrics.png)

### Logs

![](https://cdn.sematext.com/images/sample-nodejs-logs.png)

## Troubleshooting
Check out our [documentation](https://sematext.com/docs/integration/express.js/) for more information.

## Built with

- [spm-agent-nodejs](https://github.com/sematext/spm-agent-nodejs)
- [winston](https://github.com/winstonjs/winston)
- [winston-logsene](https://github.com/sematext/winston-logsene)
- [morgan](https://github.com/expressjs/morgan)
- [morgan-json](https://github.com/indexzero/morgan-json)

## LICENSE

Apache 2 - see the [LICENSE](./LICENSE) file.
