const router = require('express').Router()
const likeController = require('../controllers/like')
const checkAuth = require('../middlewares/check-auth')

router.get('/songs', checkAuth, likeController.getLikedSongs)
router.get('/all', checkAuth, likeController.getAllLiked)

module.exports = router
