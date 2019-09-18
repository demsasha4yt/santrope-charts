const config = require('../config/config')
const fetch = require('node-fetch')
const { Online } = require('../config/database');

module.exports = () => {
  setInterval(async () => {
    try {
      const response = await fetch(config.source)
      let data = await response.json()
      console.log(data)
      Online.create(data.servers[0])
    } catch (e) {
      console.log(e)
    }
  }, config.interval)
}