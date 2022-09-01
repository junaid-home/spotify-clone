const joi = require('joi')

function validatePlaylist(obj) {
  const schema = joi.object({
    name: joi.string().min(1).max(50).required(),
    code1: joi.string().min(4).max(7).required(),
    code2: joi.string().min(4).max(7).required(),
  })

  return schema.validate(obj)
}

function validateSongPlaylist(obj) {
  const schema = joi.object({
    songId: joi.string().uuid().required(),
    playlistId: joi.string().uuid().required(),
  })

  return schema.validate(obj)
}

module.exports = { validatePlaylist, validateSongPlaylist }
