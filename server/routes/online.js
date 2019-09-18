const express = require('express')
const OnlineController = require('../controllers/OnlineController')
const router = express.Router()

router.use((req, res,next) => {
  //  A middleware function for OAUTH2
  next()
})

router.get('/', OnlineController.all)
router.get('/online', OnlineController.online)
router.get('/ping', OnlineController.ping)

router.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({ error: error.message })
})

module.exports = router