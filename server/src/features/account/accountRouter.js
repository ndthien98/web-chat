const router = require('express').Router()
const accountController = require('./accountController')
const { requireLogin } = require('../../middlewares/auth')
const validators = require('../../middlewares/validators')
const tryCatch = require('../../middlewares/errorHandle').tryCatch

router.get('/info/:username',
  requireLogin,
  tryCatch(accountController.getAccountByUsername)
);

router.put('/update/:username',
  requireLogin,
  validators('displayname', 'birthday', 'gender', 'phone'),
  tryCatch(accountController.updateAccountByUsername)
);

router.get('/find',
  requireLogin,
  tryCatch(accountController.findAccount)
);

module.exports = router
