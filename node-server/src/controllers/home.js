const { songModel, artistModel, playlistModel } = require('../models')
const serializeResponse = require('../utils/response-serializer')
const getRandomObjectsFromArray = require('../utils/random-objects-pick')

async function getHomeData(req, res) {
  const userId = '123e4567-e89b-12d3-a456-426614174000'

  const songs = await songModel.findAll({ limit: 20, include: 'Artist' })
  const artists = await artistModel.findAll({ limit: 10 })
  const playlists = await playlistModel.findAll({
    where: { user_id: userId },
    limit: 5,
  })

  return serializeResponse(res, {
    special: getRandomObjectsFromArray(songs, 2),
    popular: getRandomObjectsFromArray(songs, 5),
    trending: getRandomObjectsFromArray(songs, 5),
    mood: getRandomObjectsFromArray(songs, 5),
    newPopular: getRandomObjectsFromArray(songs, 5),
    lateNight: getRandomObjectsFromArray(songs, 5),
    sleep: getRandomObjectsFromArray(songs, 5),
    focus: getRandomObjectsFromArray(songs, 5),
    playlists,
    artists: artists.slice(0, 5),
    international_artists: artists.slice(5, 10),
  })
}

module.exports = { getHomeData }
