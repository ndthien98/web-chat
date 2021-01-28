const auth = require('./auth')
const account = require('./account')
const message = require('./message')
const media = require('./media')

module.exports = [
  {
    path: '/auth',
    router: auth
  },
  {
    path: '/account',
    router: account
  },
  {
    path: '/message',
    router: message
  },
  {
    path: '/media',
    router: media
  },
  
]