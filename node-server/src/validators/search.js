const joi = require('joi')

function validateQuery(obj) {
  const schema = joi.object({
    query: joi.string().min(1).max(200).required(),
    limit: joi.string().min(1).max(200),
  })

  return schema.validate(obj)
}

module.exports = { validateQuery }
