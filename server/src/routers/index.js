const auth = require('./auth')
const account = require('./account')
const group = require('./group')
const message = require('./message')

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
    path: '/group',
    router: group
  },
  {
    path: '/message',
    router: message
  },
  
]