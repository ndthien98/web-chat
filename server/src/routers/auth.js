const router = require('express').Router();
const authController = require('../controllers/auth')
const tryCatch = require('../middlewares/errorHandle').tryCatch
const validators = require('../middlewares/validators')
const auth = require('../middlewares/auth')
const { body } = require('express-validator')

router.get('/current',
  auth.requireLogin,
  tryCatch(authController.getCurrent)
)

router.post('/login',
  validators('username', 'password'),
  tryCatch(authController.login)
)

router.post('/register',
  validators('username', 'password', 'displayname', 'gender', 'birthday', 'phone'),
  tryCatch(authController.register)
)

router.post('/change-password',
  auth.requireLogin,
  body(['newpassword']).custom((value, { req }) => {
    console.log(value)
    console.log(req.body.repassword)
    if (value === req.body.repassword)
      return true
    else {
      throw new Error('Password confirmation does not match password')
    }
  }),
  validators('password', 'newpassword', 'repassword'),
  tryCatch(authController.changePassword)
)

// router.post('/refresh-token',
//   validators('token', 'refreshToken'),
//   tryCatch(authController.refreshToken)
// )

module.exports = router