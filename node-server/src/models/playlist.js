const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')
const Color = require('./color')

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

Playlist.hasOne(Color, {
  foreignKey: 'playlist_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

module.exports = Playlist