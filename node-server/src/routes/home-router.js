const router = require('express').Router()
const homeController = require('../controllers/home')
const checkAuth = require('../middlewares/check-auth')

router.get('/', checkAuth, homeController.getHomeData)

module.exports = router
