const joi = require('joi')

function validatePlaylistLike(obj) {
  const schema = joi.object({
    playlistId: joi.string().uuid().required(),
  })

  return schema.validate(obj)
}
function validateSongLike(obj) {
  const schema = joi.object({
    songId: joi.string().uuid().required(),
  })

  return schema.validate(obj)
}
function validateArtistLike(obj) {
  const schema = joi.object({
    artistId: joi.string().uuid().required(),
  })

  return schema.validate(obj)
}

module.exports = { validatePlaylistLike, validateSongLike, validateArtistLike }
