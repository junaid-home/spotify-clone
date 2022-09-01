const fs = require('fs/promises')
const {
  playlistModel,
  colorModel,
  songModel,
  songPlaylistModel,
} = require('../models/index')
const { upload } = require('../config/cloudinary')
const serializeResponse = require('../utils/response-serializer')
const errors = require('../utils/error')
const safeUser = require('../utils/safe-user')
const responseSerializer = require('../utils/response-serializer')
const {
  validatePlaylist,
  validateSongPlaylist,
} = require('../validators/playlist')

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

async function getPlaylistById(req, res) {
  const playlist = await playlistModel.findOne({
    where: { id: req.params.id },
    include: ['User', 'Color', { model: songModel, through: 'SongPlaylists' }],
  })
  if (!playlist) {
    throw new errors.BadRequestError(
      `No playlist found with the id: ${req.params.id}`
    )
  }

  return serializeResponse(res, {
    ...playlist.get({ plain: true }),
    User: safeUser(playlist.User),
  })
}

async function addSongToPlaylist(req, res) {
  const { error } = validateSongPlaylist(req.body)
  if (error) throw new errors.BadRequestError(error.message)

  const { playlistId, songId } = req.body

  const playlistCount = await playlistModel.count({ where: { id: playlistId } })
  if (!playlistCount) {
    throw new errors.BadRequestError(`No playlist exist with id: ${playlistId}`)
  }

  const songCount = await songModel.count({ where: { id: songId } })
  if (!songCount) {
    throw new errors.BadRequestError(`No song exist with id: ${songId}`)
  }

  const songPlaylistCount = await songPlaylistModel.count({
    where: {
      SongId: songId,
      PlaylistId: playlistId,
    },
  })
  if (songPlaylistCount) {
    throw new errors.BadRequestError('Song Already exist in the playlist!')
  }

  const data = await songPlaylistModel.create({
    SongId: songId,
    PlaylistId: playlistId,
  })
  if (!data) {
    throw new errors.ApiError(null, 500, 'Failed to add song to the playlist')
  }

  return responseSerializer(res, data)
}

module.exports = { createPlaylist, getPlaylistById, addSongToPlaylist }
