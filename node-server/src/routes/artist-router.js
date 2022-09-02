const router = require('express').Router()
const artistController = require('../controllers/artist')
const checkAuth = require('../middlewares/check-auth')

router.get('/get/:id', checkAuth, artistController.getArtistById)
router.post('/like', checkAuth, artistController.addLike)

module.exports = router
