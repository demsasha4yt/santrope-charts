const Joi = require('joi')

exports.validate = (req, res, next) => {
  const schema = {
    online: Joi.number().required()
  }
}