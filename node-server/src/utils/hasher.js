const crypto = require('crypto')

function generateRandomSalt(size = 20) {
  return crypto
    .randomBytes(Math.ceil(size / 2))
    .toString('hex')
    .slice(0, size)
}

function hashify(password, salt) {
  const sha256 = crypto.createHmac('sha512', salt)
  sha256.update(password)

  const hash = sha256.digest('hex')
  return {
    salt,
    hash,
  }
}

module.exports = { hashify, generateRandomSalt }
