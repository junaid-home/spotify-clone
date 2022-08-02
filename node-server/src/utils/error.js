/* eslint-disable max-classes-per-file */
const logger = require('./console')

const statusCodes = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
}

class BaseError extends Error {
  constructor(name, statusCode, description, isOperational) {
    super(description)

    this.status = 'error'
    this.statusCode = statusCode
    this.name = name
    this.isOperational = isOperational

    Error.captureStackTrace(this)
  }
}

class ApiError extends BaseError {
  constructor(
    name = 'INTERNAL_SERVER',
    stackCode = statusCodes.INTERNAL_SERVER,
    description = 'something unexpected happened on the server.',
    isOperational = true
  ) {
    super(name, stackCode, description, isOperational)
  }
}

class NotFoundError extends BaseError {
  constructor(
    description = 'could not found the resource.',
    isOperational = true
  ) {
    super('NOT_FOUND', statusCodes.NOT_FOUND, description, isOperational)
  }
}

class BadRequestError extends BaseError {
  constructor(description = 'invalid data provided.', isOperational = true) {
    super('BAD_REQUEST', statusCodes.BAD_REQUEST, description, isOperational)
  }
}

class ErrorHandler {
  static handleError(error) {
    // log and store the error in database/file etc
    logger.log(error.message, {
      infoTextColor: 'red',
      messageTextColor: 'red',
    })

    process.exit(1)
  }

  static isTrustedError(error) {
    if (error instanceof BaseError) {
      return error.isOperational
    }
    return false
  }
}

module.exports = {
  BaseError,
  ApiError,
  NotFoundError,
  BadRequestError,
  ErrorHandler,
}
