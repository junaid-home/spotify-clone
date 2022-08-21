const path = require('path')
const { songs, artists } = require('./data')
const { log } = require('../src/utils/console')

require('dotenv').config({
  path: path.resolve(process.cwd(), 'src', 'config', '.env'),
})

const db = require('../src/config/db')
const { upload } = require('../src/config/cloudinary')

db.authenticate()

const { songModel, artistModel } = require('../src/models')

const migrateData = async () => {
  log('Migration Started!', {
    infoText: 'migration log',
  })

  let offset = 0
  await artists.forEach(async (artist) => {
    const pictureFilePath = path.resolve(
      __dirname,
      'pictures',
      `${artist.slug}.jpg`
    )
    const { url: artistImageUri } = await upload(pictureFilePath)

    const newArtist = await artistModel.create({
      name: artist.name,
      picture: artistImageUri,
    })

    /* eslint-disable no-await-in-loop */
    for (let i = 0; i < 2; i += 1) {
      const song = songs[offset]
      offset += 1

      const audioFilePath = path.resolve(
        __dirname,
        'audios',
        `${song.slug}.mp3`
      )
      const { url: songImageUrl } = await upload(audioFilePath)

      const thumbnailFilePath = path.resolve(
        __dirname,
        'thumbnails',
        `${song.slug}.jpg`
      )
      const { url: thumbnailImageUrl } = await upload(thumbnailFilePath)

      await songModel.create({
        title: song.title,
        description: song.description,
        duration: song.duration,
        src: songImageUrl,
        thumbnail: thumbnailImageUrl,
        artist_id: newArtist.id,
      })
    }
  })
}

migrateData()
