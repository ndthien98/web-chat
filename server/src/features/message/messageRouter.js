const router = require('express').Router()
const messageController = require('./messageController')
const { requireLogin } = require('../../middlewares/auth')
const validators = require('../../middlewares/validators')
const tryCatch = require('../../middlewares/errorHandle').tryCatch


module.exports = router
