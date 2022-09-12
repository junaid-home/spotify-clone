const { Sequelize } = require('sequelize')
const logger = require('../utils/console')

// const $IS_PRODUCTION = process.env.NODE_ENV !== 'production'
const $POSTGRES_DATABASE_URL =
  process.env.POSTGRES_DATABASE_URL ||
  'postgres://postgres:abc123@postgres:5432/postgres'

const sequelize = new Sequelize($POSTGRES_DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // $IS_PRODUCTION,
      rejectUnauthorized: false,
    },
  },
})

const authenticate = async () => {
  try {
    await sequelize.authenticate()
    logger.log('connection established!', {
      infoText: 'database log',
    })

    await sequelize.sync({ force: false })
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
