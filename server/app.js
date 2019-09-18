const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const config = require('./config/config')
const { sequelize } = require('./config/database')


const app = express()
app.use(morgan('combined'))
app.use(cors(bodyParser.json()))

sequelize.sync()
    .then(() => {
        app.listen(config.port, () => {
            console.log(`Santrope-shedules-server listening on port ${config.port}`)
        })
    })

