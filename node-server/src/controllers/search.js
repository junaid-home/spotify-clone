const { songModel, artistModel, playlistModel } = require('../models')
const serializeResponse = require('../utils/response-serializer')
const errors = require('../utils/error')
const validator = require('../validators/search')
const { sequelize } = require('../config/db')

async function searchByQuery(req, res) {
  const { error } = validator.validateQuery(req.body)
  if (error) throw new errors.BadRequestError(error.message)

  const limit = req.body.limit || 5

  const songs = await songModel.findAll({
    limit,
    include: 'Artist',
    where: {
      title: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('title')),
        'LIKE',
        `%${req.body.query}%`
      ),
    },
  })
  const artists = await artistModel.findAll({
    limit,
    where: {
      name: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('name')),
        'LIKE',
        `%${req.body.query}%`
      ),
    },
  })
  const playlistsIds = await playlistModel.findAll({
    limit,
    where: {
      name: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('name')),
        'LIKE',
        `%${req.body.query}%`
      ),
    },
    attributes: ['id'],
  })

  const playlists = await Promise.all(
    playlistsIds.map(async (p) => {
      const playlist = await playlistModel.findOne({
        where: { id: p.id },
        include: 'User',
      })

      return playlist
    })
  )

  return serializeResponse(res, {
    playlists,
    artists,
    songs,
  })
}

module.exports = { searchByQuery }
