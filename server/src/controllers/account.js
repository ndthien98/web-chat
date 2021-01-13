const accountService = require('../services/account')

const getAccountByUsername = async (req, res, next) => {
  const username = req.params.username
  console.log(username)
  const account = await accountService.getAccountByUsername(username)
  res.send({
    status: 1,
    data: account
  })
}
const getUsersFriends = async (req, res, next) => {
  res.send(`get user's friend `)
}
const updateAccountByUsername = async (req, res, next) => {
  const { username } = req.auth
  const { displayname, birthday, gender, phone } = req.body
  await accountService.updateAccountByUsername({ username, displayname, birthday, gender, phone })
  req.notifySuccess()
}
const lockAccountByUsername = async (req, res, next) => {
  res.send('lockAccountByUsername')
}
const requestFriend = async (req, res, next) => {
  res.send('requestFriend')
}
const acceptFriend = async (req, res, next) => {
  res.send('acceptFriend')
}

module.exports = {
  getAccountByUsername,
  getUsersFriends,
  updateAccountByUsername,
  lockAccountByUsername,
  requestFriend,
  acceptFriend
}