const accountService = require('./accountService')

const getAccountByUsername = async (req, res, next) => {
  const username = req.params.username
  console.log(username)
  const account = await accountService.getAccountByUsername(username)
  res.send({
    status: 1,
    account
  })
}

const updateAccountByUsername = async (req, res, next) => {
  const { username } = req.auth
  const { displayname, birthday, gender, phone } = req.body
  await accountService.updateAccountByUsername({ username, displayname, birthday, gender, phone })
  req.notifySuccess()
}

const findAccount = async (req, res, next) => {
  const keyword = req.query.keyword
  console.log(keyword)
  const account = await accountService.findAccount(keyword)
  res.send({
    status: 1,
    account
  })
}

const updateAvatar = async (req, res, next) => {
  const { username } = req.auth
  const { avatar } = req.body
  await accountService.updateAvatar(username, avatar)
  req.notifySuccess()
}


module.exports = {
  getAccountByUsername,
  updateAccountByUsername,
  findAccount,
  updateAvatar,
}