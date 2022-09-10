const querystring = require('querystring')
const serializeResponse = require('../utils/response-serializer')
const validator = require('../validators/auth')
const errors = require('../utils/error')
const hasher = require('../utils/hasher')
const { userModel } = require('../models')
const googleOauth2 = require('../utils/google-Oath2.0')
const fbOauth2 = require('../utils/facebook-Oauth2.0')
const safeUser = require('../utils/safe-user')

// signup handler
const createNewUser = async (req, res) => {
  const { error } = validator.validateNewUser(req.body)
  if (error) throw new errors.BadRequestError(error.message)

  const isPreviouslyRegistered = await userModel.findOne({
    where: { email: req.body.email },
  })

  if (isPreviouslyRegistered) {
    throw new errors.BadRequestError('User already registered, please login!')
  }

  const salt = hasher.generateRandomSalt()
  const hashedPassword = hasher.hashify(req.body.password, salt)

  const newUser = await userModel.create({
    ...req.body,
    password: hashedPassword.hash,
    salt: hashedPassword.salt,
  })

  const userSlice = safeUser(newUser)
  req.session.user = userSlice

  return serializeResponse(res, { user: { ...userSlice } })
}

// Login handler
const authenticateUser = async (req, res) => {
  const { error } = validator.validateLoginCredentials(req.body)
  if (error) throw new errors.BadRequestError(error.message)

  const user = await userModel.findOne({
    where: { email: req.body.email },
  })
  if (!user) {
    throw new errors.NotFoundError("User don't exist, please signup!")
  }

  const hashedPassword = hasher.hashify(req.body.password, user.salt)
  if (hashedPassword.hash !== user.password) {
    throw new errors.BadRequestError('Invalid password!')
  }

  const userSlice = safeUser(user)
  req.session.user = userSlice

  return serializeResponse(res, { user: { ...userSlice } })
}

// Logout handler
const destroyUserSession = async (req, res) => {
  req.session = null

  return serializeResponse(res, 'Logout successful!')
}

// Get google auth URL
const getGoogleOauth2URI = async (_req, res) => {
  const uri = await googleOauth2.getGoogleAuthURL()
  if (!uri) {
    throw new errors.ApiError('UN_KNOWN', 500, 'failed to get google Oauth URI')
  }

  return serializeResponse(res, uri)
}

// Login with Google
const authenticateWithGoogleAccount = async (req, res) => {
  const { query } = req.body
  if (typeof query !== 'string' || query.length < 20) {
    throw new errors.BadRequestError('Please provide a valid "query" input.')
  }

  const parsedQuery = querystring.parse(query)
  if (!Object.keys(parsedQuery).includes('code')) {
    throw new errors.BadRequestError('Please provide a valid "query" input.')
  }

  const user = await googleOauth2.getGoogleUser({ code: parsedQuery.code })

  const isUserAlreadyExist = await userModel.findOne({
    where: { email: user?.email },
  })

  const { email, name, picture } = user
  const newUser = { email, name, picture }

  if (isUserAlreadyExist) {
    newUser.id = isUserAlreadyExist.id
  }

  if (user?.email && !isUserAlreadyExist) {
    const createdUser = await userModel.create(newUser)
    newUser.id = createdUser.id
  }

  req.session.user = newUser

  return serializeResponse(res, { user: newUser })
}

// Get facebook auth URL
const getFacebookOauth2URI = async (_req, res) => {
  const uri = await fbOauth2.getFacebookAuthURL()
  if (!uri) {
    throw new errors.ApiError(
      'UN_KNOWN',
      500,
      'failed to get facebook Oauth URI'
    )
  }

  return serializeResponse(res, uri)
}

// Login with Facebook
const authenticateWithFacebookAccount = async (req, res) => {
  const { query } = req.body
  if (typeof query !== 'string' || query.length < 20) {
    throw new errors.BadRequestError('Please provide a valid "query" input.')
  }

  const parsedQuery = querystring.parse(query)
  if (!Object.keys(parsedQuery).includes('code')) {
    throw new errors.BadRequestError('Please provide a valid "query" input.')
  }

  const user = await fbOauth2.getFacebookUser({ code: parsedQuery.code })

  const isUserAlreadyExist = await userModel.findOne({
    where: { email: `${user.id}@facebook.com` },
  })

  const { name, picture } = user
  const newUser = {
    name,
    picture: picture?.data?.url,
    email: `${user.id}@facebook.com`,
  }

  if (isUserAlreadyExist) {
    newUser.id = isUserAlreadyExist.id
  }

  if (user?.id && !isUserAlreadyExist) {
    const createdUser = await userModel.create(newUser)
    newUser.id = createdUser.id
  }

  req.session.user = newUser

  return serializeResponse(res, { user: newUser })
}

async function updateUserData(req, res) {
  const { error } = validator.validateUserUpdate(req.body)
  if (error) throw new errors.BadRequestError(error.message)

  const user = await userModel.findOne({
    where: { id: req.session.user.id },
  })
  if (!user) {
    throw new errors.NotFoundError("User don't exist!")
  }

  const newUser = await userModel.update(req.body, {
    where: { id: req.session.user.id },
  })
  if (!newUser.length) {
    throw new errors.NotFoundError('User update Failed!')
  }

  const userSlice = safeUser({ ...req.session.user, ...req.body })
  req.session.user = userSlice

  return serializeResponse(res, { user: { ...userSlice } })
}

module.exports = {
  createNewUser,
  authenticateUser,
  destroyUserSession,
  getGoogleOauth2URI,
  authenticateWithGoogleAccount,
  getFacebookOauth2URI,
  authenticateWithFacebookAccount,
  updateUserData,
}
