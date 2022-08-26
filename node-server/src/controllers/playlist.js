const fs = require('fs/promises')
const { playlistModel, colorModel } = require('../models/index')
const { upload } = require('../config/cloudinary')
const { validatePlaylist } = require('../validators/playlist')
const serializeResponse = require('../utils/response-serializer')
const errors = require('../utils/error')

async function createPlaylist(req, res) {
  const { error } = validatePlaylist(req.body)
  if (error) throw new errors.BadRequestError(error.message)

  const { file } = req
  if (!file) throw new errors.BadRequestError('Picture should be uploaded!')

  const { url } = await upload(file.path)
  if (!url) {
    throw new errors.BadRequestError('Failed to upload picture in cloudinary.')
  }
  await fs.rm(file.path)

  const { code1, code2, name } = req.body
  const playlist = await playlistModel.create({
    name,
    picture: url,
    user_id: req.session.user.id,
  })
  if (!playlist) {
    throw new errors.BadRequestError('Failed to create Playlist in database.')
  }

  const color = await colorModel.create({
    code1,
    code2,
    playlist_id: playlist.id,
  })
  if (!color) {
    throw new errors.BadRequestError('Failed to create color in database.')
  }

  return serializeResponse(res, {
    id: playlist.id,
    name: playlist.name,
    picture: playlist.picture,
    colors: {
      code1: color.code1,
      code2: color.code2,
    },
  })
}

module.exports = { createPlaylist }
