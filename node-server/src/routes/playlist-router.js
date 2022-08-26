const router = require('express').Router()
const playlistController = require('../controllers/playlist')
const checkAuth = require('../middlewares/check-auth')
const { upload } = require('../utils/file-uploader')

router.post(
  '/create',
  checkAuth,
  upload.single('picture'),
  playlistController.createPlaylist
)

module.exports = router
