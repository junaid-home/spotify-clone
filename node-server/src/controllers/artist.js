const {
  artistModel,
  songModel,
  likedArtistModel,
  userModel,
} = require('../models/index')
const serializeResponse = require('../utils/response-serializer')
const errors = require('../utils/error')
const responseSerializer = require('../utils/response-serializer')
const { validateArtistLike } = require('../validators/like')

async function getArtistById(req, res) {
  const artist = await artistModel.findOne({
    where: { id: req.params.id },
    include: [{ model: songModel }],
  })
  if (!artist) {
    throw new errors.BadRequestError(
      `No artist found with the id: ${req.params.id}`
    )
  }

  return serializeResponse(res, artist)
}

async function addLike(req, res) {
  const { error } = validateArtistLike(req.body)
  if (error) throw new errors.BadRequestError(error.message)

  const { userId, artistId } = req.body

  const artistCount = await artistModel.count({ where: { id: artistId } })
  if (!artistCount) {
    throw new errors.BadRequestError(`No artist exist with id: ${artistId}`)
  }

  const userCount = await userModel.count({ where: { id: userId } })
  if (!userCount) {
    throw new errors.BadRequestError(`No User exist with id: ${userId}`)
  }

  const artistLikesCount = await likedArtistModel.count({
    where: {
      UserId: userId,
      ArtistId: artistId,
    },
  })
  if (artistLikesCount) {
    await likedArtistModel.destroy({
      where: { UserId: userId, ArtistId: artistId },
    })

    return responseSerializer(res, { message: 'Unliked successfully!' })
  }

  await likedArtistModel.create({
    UserId: userId,
    ArtistId: artistId,
  })

  return responseSerializer(res, { message: 'liked successfully!' })
}

module.exports = { getArtistById, addLike }
