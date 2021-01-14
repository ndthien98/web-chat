const router = require('express').Router()
const mediaService = require('./mediaController')
const { requireLogin } = require('../../middlewares/auth')
const upload = require('../../middlewares/upload')
const tryCatch = require('../../middlewares/errorHandle').tryCatch

router.put('/upload',
  requireLogin,
  upload.single('image'),
  tryCatch(mediaService.uploadImage)
);

module.exports = router
