const serializeResponse = require('../utils/response-serializer')
const {
  songModel,
  userModel,
  artistModel,
  playlistModel,
  likedPlaylistModel,
} = require('../models')

async function getLikedSongs(req, res) {
  const userId = req.session.user.id

  const user = await userModel.findOne({
    where: { id: userId },
    include: { model: songModel },
  })

  return serializeResponse(res, user.Songs)
}

async function getAllLiked(req, res) {
  const userId = req.session.user.id

  const user = await userModel.findOne({
    where: { id: userId },
    include: [{ model: songModel }, { model: artistModel }],
  })

  const likedPlaylistIds = await likedPlaylistModel.findAll({
    where: { UserId: userId },
  })

  const populatedLikedPlaylists = await Promise.all(
    likedPlaylistIds.map(
      (p) =>
        playlistModel.findOne({ where: { id: p.PlaylistId }, include: 'User' })
      // eslint-disable-next-line function-paren-newline
    )
  )

  return serializeResponse(res, {
    songs: user.Songs,
    playlists: populatedLikedPlaylists,
    artists: user.Artists,
  })
}

module.exports = { getLikedSongs, getAllLiked }
