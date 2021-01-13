const router = require('express').Router()
const accountController = require('../controllers/account')
const { requireLogin } = require('../middlewares/auth')
const validators = require('../middlewares/validators')
const tryCatch = require('../middlewares/errorHandle').tryCatch

router.get('/info/:username',
  requireLogin,
  tryCatch(accountController.getAccountByUsername))

router.get('/accept/:username',
  requireLogin,
  tryCatch(accountController.acceptFriend))

router.get('/friend/:username',
  requireLogin,
  tryCatch(accountController.getUsersFriends))

router.get('/request/:username',
  requireLogin,
  tryCatch(accountController.requestFriend))

router.put('/update/:username',
  requireLogin,
  validators('displayname', 'birthday', 'gender', 'phone'),
  tryCatch(accountController.updateAccountByUsername))

router.delete('/lock/:username',
  requireLogin,
  tryCatch(accountController.lockAccountByUsername))

module.exports = router
