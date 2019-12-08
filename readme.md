# Sematext Agent Express

## Guide

Make sure to configure your ENVIRONMENT variables before adding `sematext-agent-express`.

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