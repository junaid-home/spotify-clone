const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')

const User = sequelize.define('User', {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  salt: {
    type: DataTypes.STRING,
  },
  dob: {
    type: DataTypes.DATE,
  },
  gender: {
    type: DataTypes.STRING,
  },
  country: {
    type: DataTypes.STRING,
  },
  picture: {
    type: DataTypes.STRING,
  },
})

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
    type: DataTypes.STRING,
  },
})

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

const Color = sequelize.define('Color', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
  },
  code1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

const SongPlaylist = sequelize.define('SongPlaylist', {})

User.belongsToMany(Song, { through: 'Likes' })
Song.belongsToMany(User, { through: 'Likes' })

User.hasMany(Playlist, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
Playlist.belongsTo(User, { foreignKey: 'user_id' })

Song.belongsToMany(Playlist, { through: SongPlaylist })
Playlist.belongsToMany(Song, { through: SongPlaylist })

Playlist.hasOne(Color, {
  foreignKey: 'playlist_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
Color.belongsTo(Playlist, { foreignKey: 'playlist_id' })

Artist.hasMany(Song, {
  foreignKey: 'artist_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
Song.belongsTo(Artist, { foreignKey: 'artist_id' })

module.exports = {
  userModel: User,
  songModel: Song,
  artistModel: Artist,
  playlistModel: Playlist,
  colorModel: Color,
  songPlaylistModel: SongPlaylist,
}
