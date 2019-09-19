const { Online } = require('../config/database');

exports.all =  async (req, res, next) => {
  try {
    const onlines = await Online.findAll({
      limit: 10000,
      order: [['id', 'DESC']]
    })
    res.status(200).send(onlines)
  } catch (e) {
    next(e)
  }
}

exports.online = async(req, res, next) => {
  try {
    const onlines = await Online.findAll({
      limit: 10000,
      attributes: ['players', 'maxplayers', 'createdAt'],
      order: [['id', 'DESC']]
    })
    res.status(200).send(onlines)
  } catch (e) {
    next(e)
  }
}

exports.ping = async(req, res, next) => {
  try {
    const onlines = await Online.findAll({
      limit: 100,
      attributes: ['id', 'ping', 'createdAt'],
      order: [['id', 'DESC']]
    })
    res.status(200).send(onlines)
  } catch (e) {
    next(e)
  }
}

exports.period = async (req, res, next) => {
  try {

  } catch (e) {
    next(e)
  }
}

exports.create = async (req, res, next) => {
  try {
    const online = await Online.create(req.body)
    res.send(online)
  } catch (e) {
    next(e);
  }
}
