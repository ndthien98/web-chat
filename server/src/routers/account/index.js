const router = require('express').Router()
const accountController = require('./accountController')
const { requireLogin } = require('../../middlewares/auth')
const validators = require('../../middlewares/validators')
const tryCatch = require('../../middlewares/errorHandle').tryCatch

router.get('/find',
  requireLogin,
  tryCatch(accountController.findAccount)
);

router.put('/avatar',
  requireLogin,
  validators('avatar'),
  tryCatch(accountController.updateAvatar)
);

router.get('/:username',
  requireLogin,
  tryCatch(accountController.getAccountByUsername)
);

router.put('/:username',
  requireLogin,
  validators('displayname', 'birthday', 'gender', 'phone'),
  tryCatch(accountController.updateAccountByUsername)
);


module.exports = router
