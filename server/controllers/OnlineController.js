const { Online } = require('../config/database');

exports.all =  async (req, res, next) => {
  try {
    const onlines = await Online.findAll()
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
