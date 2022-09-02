const router = require('express').Router()
const songController = require('../controllers/song')
const checkAuth = require('../middlewares/check-auth')

router.post('/like', checkAuth, songController.addLike)

module.exports = router
