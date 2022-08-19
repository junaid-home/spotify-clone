const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')
const Song = require('./song')
const User = require('./user')

const Playlist = sequelize.define('Playlist', {
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

Playlist.hasMany(Song, {
  foreignKey: 'songs',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

Playlist.hasOne(User, {
  foreignKey: 'user',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

module.exports = Playlist
