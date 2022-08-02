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

module.exports = User
