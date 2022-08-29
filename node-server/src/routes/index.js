const userRouter = require('./auth-router')
const homeRouter = require('./home-router')
const searchRouter = require('./seatch-router')
const playlistRouter = require('./playlist-router')
const artistRouter = require('./artist-router')

function register(app) {
  app.use('/auth', userRouter)
  app.use('/home', homeRouter)
  app.use('/search', searchRouter)
  app.use('/playlist', playlistRouter)
  app.use('/artist', artistRouter)
}

module.exports = { register }
