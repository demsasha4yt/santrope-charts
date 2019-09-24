const config = require('../config/config')
const fetch = require('node-fetch')
const { Online } = require('../config/database');

module.exports = () => {
  (async () => {
    try {
    const response = await fetch(config.source)
    let data = await response.json()
    for (let i = 0; i < data.length; i++)
    {
        Online.create(data.servers[i])
    }
  } catch (e) {
    console.log(e)
  }
  })()
  setInterval(async () => {
    try {
      const response = await fetch(config.source)
      let data = await response.json()
      Online.create(data.servers[0])
    } catch (e) {
      console.log(e)
    }
  }, config.interval)
}