const router = require('express').Router()
const searchController = require('../controllers/search')
const checkAuth = require('../middlewares/check-auth')

router.post('/', checkAuth, searchController.searchByQuery)

module.exports = router
