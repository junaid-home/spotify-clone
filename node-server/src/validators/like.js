const joi = require('joi')

function validatePlaylistLike(obj) {
  const schema = joi.object({
    userId: joi.string().uuid().required(),
    playlistId: joi.string().uuid().required(),
  })

  return schema.validate(obj)
}
function validateSongLike(obj) {
  const schema = joi.object({
    userId: joi.string().uuid().required(),
    songId: joi.string().uuid().required(),
  })

  return schema.validate(obj)
}
function validateArtistLike(obj) {
  const schema = joi.object({
    userId: joi.string().uuid().required(),
    artistId: joi.string().uuid().required(),
  })

  return schema.validate(obj)
}

module.exports = { validatePlaylistLike, validateSongLike, validateArtistLike }
