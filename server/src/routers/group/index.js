const router = require('express').Router()
const groupController = require('./groupController')
const { requireLogin } = require('../../middlewares/auth')
const validators = require('../../middlewares/validators')
const tryCatch = require('../../middlewares/errorHandle').tryCatch

router.post('/',
  requireLogin,
  tryCatch(groupController.createGroup)
);

router.get('/:groupid',
  requireLogin,
  tryCatch(groupController.getGroupById)
);

router.put('/name',
  requireLogin,
  tryCatch(groupController.updateGroupName)
);

router.put('/image',
  requireLogin,
  tryCatch(groupController.updateGroupImage)
);


module.exports = router
