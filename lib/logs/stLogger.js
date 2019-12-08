const createStLogger = require('./createStLogger')
const logsToken = process.env.LOGS_TOKEN
const logsReceiverUrl = process.env.LOGSENE_RECEIVER_URL || 'https://logsene-receiver.sematext.com/_bulk'

const stLogger = () => createStLogger(logsToken, logsReceiverUrl, 'LOGS')
module.exports = stLogger
