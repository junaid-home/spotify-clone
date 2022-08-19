const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')

const Song = sequelize.define('Song', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  thumbnail: {
    type: DataTypes.STRING,
  },
  src: {
    type: DataTypes.STRING,
  },
  duration: {
    type: DataTypes.DATE,
  },
})

module.exports = Song
