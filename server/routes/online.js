const express = require('express')
const OnlineController = require('../controllers/OnlineController')
const router = express.Router


router.use((req, res, next) => {
  // A middleware function for OAUTH2
})

router.get('/', OnlineController.all)

module.exports = router