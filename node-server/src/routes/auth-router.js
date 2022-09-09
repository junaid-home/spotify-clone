const router = require('express').Router()
const authController = require('../controllers/auth')

router.post('/signup', authController.createNewUser)
router.post('/login', authController.authenticateUser)
router.get('/logout', authController.destroyUserSession)
router.get('/google/uri', authController.getGoogleOauth2URI)
router.post('/google/login', authController.authenticateWithGoogleAccount)
router.get('/facebook/uri', authController.getFacebookOauth2URI)
router.post('/facebook/login', authController.authenticateWithFacebookAccount)
router.put('/update/user', authController.updateUserData)

module.exports = router
