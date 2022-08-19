const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')
const Song = require('./song')

const Artist = sequelize.define('Artist', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

Artist.hasMany(Song, {
  foreignKey: 'songs',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

module.exports = Artist
