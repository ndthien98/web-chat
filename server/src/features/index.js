const auth = require('./auth/authRouter')
const account = require('./account/accountRouter')
const group = require('./group/groupRouter')
const message = require('./message/messageRouter')

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