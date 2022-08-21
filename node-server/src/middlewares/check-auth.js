const errors = require('../utils/error')

function checkAuth(req, _res, next) {
  if (req.session?.user?.id?.length) {
    next()
  } else {
    throw new errors.BadRequestError('Please Login to access this route')
  }
}

module.exports = checkAuth
