const db = require('../utils/mysqldb')

const checkExist = async (username) => {
  const sql = `SELECT username FROM account WHERE username = ?;`
  const result = await db.queryMulti(sql, [username]);
  return result.length > 0
}
const createAccount = async ({ username, password, displayname, birthday, gender, phone }) => {
  const sql = `INSERT INTO account(userid, username, password, displayname, birthday, gender, phone) VALUE(uuid(),?,?,?,?,?,?)`;
  await db.queryNone(sql, [username, password, displayname, new Date(birthday), gender, phone]);
  return true
}
const getEncryptPassword = async (username) => {
  const sql = `SELECT password FROM account WHERE username = ?;`
  const { password } = await db.queryOne(sql, [username]);
  return password
}
const changePassword = async (username, newpassword) => {
  const sql = `
  UPDATE account
  SET \`password\` = ? 
  WHERE username = ?;`
  await db.queryOne(sql, [newpassword, username]);
}
module.exports = {
  checkExist,
  createAccount,
  getEncryptPassword,
  changePassword
}