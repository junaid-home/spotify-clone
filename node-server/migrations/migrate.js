const path = require('path')
const { songs, artists } = require('./data')
const { log } = require('../src/utils/console')

require('dotenv').config({
  path: path.resolve(process.cwd(), 'src', 'config', '.env'),
})

const db = require('../src/config/db')
const { upload } = require('../src/config/cloudinary')

db.authenticate()

const SongModel = require('../src/models/song')
const ArtistModel = require('../src/models/artist')

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
    log(`uploading artist profile image. ${pictureFilePath}`, {
      infoText: 'migration log',
    })
    const { url: artistImageUri } = await upload(pictureFilePath)

    const newArtist = await ArtistModel.create({
      name: artist.name,
      picture: artistImageUri,
    })
    log(`added artist in db: ${newArtist.id}`, {
      infoText: 'migration log',
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
      log(`uploading song mp3 file. ${audioFilePath}`, {
        infoText: 'migration log',
      })
      const { url: songImageUrl } = await upload(audioFilePath)

      const thumbnailFilePath = path.resolve(
        __dirname,
        'thumbnails',
        `${song.slug}.jpg`
      )
      log(`uploading song thumbnail. ${thumbnailFilePath}`, {
        infoText: 'migration log',
      })
      const { url: thumbnailImageUrl } = await upload(thumbnailFilePath)

      const newSong = await SongModel.create({
        title: song.title,
        description: song.description,
        duration: song.duration,
        src: songImageUrl,
        thumbnail: thumbnailImageUrl,
        artist_id: newArtist.id,
      })
      log(`added song in db: ${newSong.id}`, {
        infoText: 'migration log',
      })
    }
  })
}

migrateData()
