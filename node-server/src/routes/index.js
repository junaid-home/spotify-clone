const userRouter = require('./auth-router')
const homeRouter = require('./home-router')
const searchRouter = require('./seatch-router')
const playlistRouter = require('./playlist-router')

function register(app) {
  app.use('/auth', userRouter)
  app.use('/home', homeRouter)
  app.use('/search', searchRouter)
  app.use('/playlist', playlistRouter)
}

module.exports = { register }
