const router = require('express').Router()
const messageController = require('./messageController')
const { requireLogin } = require('../../middlewares/auth')
const validators = require('../../middlewares/validators')
const tryCatch = require('../../middlewares/errorHandle').tryCatch

router.get('/',
  requireLogin,
  tryCatch(messageController.getMessageOfGroup)
);

router.get('/last',
  requireLogin,
  tryCatch(messageController.getLastMessageOfGroup)
);

router.get('/:messageid',
  requireLogin,
  tryCatch(messageController.getMessageById)
);

module.exports = router
