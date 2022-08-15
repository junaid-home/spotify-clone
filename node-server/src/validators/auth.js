const joi = require('joi')

const validEmail = joi
  .string()
  .email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'org', 'io'] },
  })
  .required()

const validPassword = joi
  .string()
  .pattern(/^[a-zA-Z0-9]{8,30}$/)
  .message(
    'Password must be at least 8 characters long and must only be alphanumeric'
  )
  .required()

function validateNewUser(obj) {
  const schema = joi.object({
    email: validEmail,
    password: validPassword,
    name: joi.string().min(3).max(30).required(),
    country: joi.string().min(3).max(30).required(),
    gender: joi.string().valid('male', 'female').required(),
    dob: joi.date().timestamp().required(),
  })

  return schema.validate(obj)
}

function validateLoginCredentials(obj) {
  const schema = joi.object({
    email: validEmail,
    password: validPassword,
  })

  return schema.validate(obj)
}

module.exports = { validateNewUser, validateLoginCredentials }
