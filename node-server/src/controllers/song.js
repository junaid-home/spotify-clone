const { validateSongLike } = require('../validators/like')
const errors = require('../utils/error')
const responseSerializer = require('../utils/response-serializer')
const { songModel, userModel, likeSongModel } = require('../models')

async function addLike(req, res) {
  const { error } = validateSongLike(req.body)
  if (error) throw new errors.BadRequestError(error.message)

  const { songId } = req.body
  const userId = req.session.user.id

  const songCount = await songModel.count({ where: { id: songId } })
  if (!songCount) {
    throw new errors.BadRequestError(`No song exist with id: ${songId}`)
  }

  const userCount = await userModel.count({ where: { id: userId } })
  if (!userCount) {
    throw new errors.BadRequestError(`No User exist with id: ${userId}`)
  }

  const songLikesCount = await likeSongModel.count({
    where: {
      UserId: userId,
      SongId: songId,
    },
  })
  if (songLikesCount) {
    await likeSongModel.destroy({
      where: { UserId: userId, SongId: songId },
    })

    return responseSerializer(res, { message: 'Unliked successfully!' })
  }

  await likeSongModel.create({
    UserId: userId,
    SongId: songId,
  })

  return responseSerializer(res, { message: 'liked successfully!' })
}

module.exports = { addLike }
