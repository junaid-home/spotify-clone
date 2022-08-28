const pick = require('lodash.pick')

const safeUser = (user) =>
  pick(user, ['id', 'name', 'email', 'gender', 'dob', 'country'])

module.exports = safeUser
