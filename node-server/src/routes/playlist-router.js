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
router.get('/get/:id', checkAuth, playlistController.getPlaylistById)
router.post('/add-song', checkAuth, playlistController.addSongToPlaylist)

module.exports = router
