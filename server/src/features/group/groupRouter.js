const router = require('express').Router()
const groupController = require('./groupController')
const { requireLogin } = require('../../middlewares/auth')
const validators = require('../../middlewares/validators')
const tryCatch = require('../../middlewares/errorHandle').tryCatch

router.post('/',
  requireLogin,
  tryCatch(groupController.createGroup)
);


module.exports = router
