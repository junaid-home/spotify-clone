const querystring = require('querystring')
const axios = require('axios')

const $CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000'
const $GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const $GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

const redirectURI = `${$CORS_ORIGIN}/google/redirect`

function getGoogleAuthURL() {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'

  const options = {
    redirect_uri: redirectURI,
    client_id: $GOOGLE_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  }

  return `${rootUrl}?${querystring.stringify(options)}`
}

function getTokens(code) {
  const url = 'https://oauth2.googleapis.com/token'

  const values = {
    code,
    client_id: $GOOGLE_CLIENT_ID,
    client_secret: $GOOGLE_CLIENT_SECRET,
    redirect_uri: redirectURI,
    grant_type: 'authorization_code',
  }

  return axios
    .post(url, querystring.stringify(values), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.message)
    })
}

async function getGoogleUser({ code }) {
  const tokens = await getTokens(code)

  // Fetch the user's profile with the access token and bearer
  const googleUser = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.id_token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.message)
    })

  return googleUser
}

module.exports = { getGoogleAuthURL, getGoogleUser }
