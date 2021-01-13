const { body, validationResult } = require('express-validator');

const validators = (fields) => {
  const catchValidatorErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 0,
        errors: errors.array()
      });
    } else {
      return next();
    }
  }
  return [
    body(fields).notEmpty().withMessage('Không được để trống'),
    catchValidatorErrors
  ]
}

module.exports = validators