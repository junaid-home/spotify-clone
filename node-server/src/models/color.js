const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')

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

module.exports = Color
