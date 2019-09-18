const Sequelize = require('sequelize')
const config = require('./config')
const fs = require('fs')
const path = require('path')

db = {}

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

fs.readdirSync(path.join(__dirname, '..', 'models'))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, '..', 'models', file))
    db[model.name] = model
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db