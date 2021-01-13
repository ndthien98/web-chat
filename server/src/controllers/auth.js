const authService = require('../services/auth')
const accountService = require('../services/account')
const security = require('../utils/security')

const getCurrent = async (req, res, next) => {
  const account = await accountService.getAccountByUsername(req.auth.username)
  delete account.password;
  res.send({
    status: 1,
    account
  })
}
const login = async (req, res, next) => {
  const { username, password } = req.body
  const existed = await authService.checkExist(username);
  if (!existed) {
    next('Tài khoản không tồn tại!')
  } else {
    const encryptPassword = await authService.getEncryptPassword(username)
    const rs = await security.verifyPassword(password, encryptPassword)
    if (rs) {
      const user = await accountService.getAccountByUsername(username)
      const token = security.generateToken({
        userid: user.userid,
        username: user.username,
        role: user.role
      })
      res.send({
        userid: user.userid,
        role: user.role,
        token
      })
    } else {
      next('Đăng nhập thất bại!')
    }
  }
}
const changePassword = async (req, res, next) => {
  const { password, newpassword } = req.body;
  const encryptPassword = await authService.getEncryptPassword(req.auth.username)
  const rs1 = await security.verifyPassword(password, encryptPassword)
  if (rs1) {
    const newEncryptPassword = await security.generatePassword(newpassword)
    await authService.changePassword(req.auth.username, newEncryptPassword)
    req.notifySuccess('Đổi mật khẩu thành công!')
    return
  }
  next('Đổi mật khẩu thất bại!')
}

const register = async (req, res, next) => {
  const { username, password, displayname, birthday, gender, phone } = req.body
  if (await authService.checkExist(username)) {
    next('Tài khoản đã tồn tại!');
  } else {
    const encryptPassword = await security.generatePassword(password)
    const rs = await authService.createAccount({ username, password: encryptPassword, displayname, birthday, gender, phone });
    if (rs) {
      req.notifySuccess('Tạo tài khoản thành công')
    } else {
      next('Tạo tài khoản thất bại!');
    }
  }
}

module.exports = {
  getCurrent,
  login,
  changePassword,
  register
}