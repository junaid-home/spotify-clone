const { ErrorHandler } = require('../utils/error')

async function centralErrorHandler(err, _req, res, next) {
  if (!ErrorHandler.isTrustedError(err)) {
    next(err)
  }
  const { name, status, statusCode = 500, message } = err

  return res.status(statusCode).json({ status, statusCode, name, message })
}

async function handleUncaughtErrors(error) {
  ErrorHandler.handleError(error)
  if (!ErrorHandler.isTrustedError(error)) {
    process.exit(1)
  }
}

module.exports = { centralErrorHandler, handleUncaughtErrors }
