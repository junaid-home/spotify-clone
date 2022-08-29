const { artistModel, songModel } = require('../models/index')
const serializeResponse = require('../utils/response-serializer')
const errors = require('../utils/error')

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

module.exports = { getArtistById }
