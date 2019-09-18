const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const config = require('./config/config')
const { sequelize } = require('./config/database')
const onlineRouter = require('./routes/online')

const app = express()

app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json())

app.use('/api/v1/online', onlineRouter)

app.use((req, res, next) => {
    res.status(404);
    res.send("Привет")
})

sequelize.sync()
    .then(() => {
        app.listen(config.port, () => {
            require('./cache/cache')()
            console.log(`Santrope-shedules-server listening on port ${config.port}`)
        })
    })

