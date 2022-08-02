const querystring = require('querystring')
const axios = require('axios')

const $CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000'
const $FB_APP_ID = process.env.FB_APP_ID
const $FB_APP_SECRET = process.env.FB_APP_SECRET

const redirectURI = `${$CORS_ORIGIN}/facebook/redirect`

function getFacebookAuthURL() {
  const rootUrl = 'https://www.facebook.com/v6.0/dialog/oauth'

  const options = {
    client_id: $FB_APP_ID,
    redirect_uri: redirectURI,
  }

  return `${rootUrl}?${querystring.stringify(options)}`
}

function getTokens(code) {
  const url = 'https://graph.facebook.com/v6.0/oauth/access_token'

  const values = {
    code,
    client_id: $FB_APP_ID,
    client_secret: $FB_APP_SECRET,
    redirect_uri: redirectURI,
  }

  return axios
    .get(`${url}?${querystring.stringify(values)}`)
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.message)
    })
}

const getFacebookUser = async ({ code }) => {
  const tokens = await getTokens(code)

  // Fetch the user's profile with the access token and bearer
  const fbUser = await axios
    .get(
      `https://graph.facebook.com/me?fields=id,email,picture,name&access_token=${tokens.access_token}`
    )
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.message)
    })

  return fbUser
}

module.exports = { getFacebookAuthURL, getFacebookUser }
