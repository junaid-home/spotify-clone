const { Sequelize } = require('sequelize')
const logger = require('../utils/console')

const $IS_DEV = process.env.NODE_ENV !== 'production'
const $POSTGRES_DATABASE_URL =
  process.env.POSTGRES_DATABASE_URL ||
  'postgres://postgres:abc123@postgres:5432/postgres'

const sequelize = new Sequelize($POSTGRES_DATABASE_URL)

const authenticate = async () => {
  try {
    await sequelize.authenticate()
    logger.log('connection established!', {
      infoText: 'database log',
    })

    await sequelize.sync({ force: $IS_DEV })
    logger.log('All models are synchronized!', {
      infoText: 'database migrations',
      infoTextColor: 'green',
      messageTextColor: 'green',
    })
  } catch (error) {
    logger.log(`Unable to connect to the database:\n${error}`, {
      infoText: 'database log',
      infoTextColor: 'red',
      messageTextColor: 'red',
    })
  }
}

module.exports = { authenticate, sequelize }
