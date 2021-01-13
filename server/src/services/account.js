const db = require('../utils/mysqldb')

const createAccount = async (username, displayname, birthday, gender, phone) => {
  const sqlAuth = `
  SELECT userid FROM auth WHERE username = ?;
  `;
  const sqlAccount = `
  INSERT INTO account(userid, displayname, birthday, gender, phone) VALUE(?,?,?,?,?);
  `;
  const { userid } = await db.queryOne(sqlAuth);
  await db.queryNone(sqlAccount, [userid, displayname, birthday, gender, phone])
  return true;
}

const getAccountByUsername = async (username) => {
  const sql = `SELECT * FROM account WHERE username = ?;`
  const account = await db.queryOne(sql, [username]);
  delete account.password
  return account
}
const updateAccountByUsername = async ({ username, displayname, birthday, gender, phone }) => {
  const sql = `
  UPDATE account
  SET 
    displayname = ?,
    birthday = ?,
    gender = ?,
    phone = ?
  WHERE username = ?;
  `;
  await db.queryNone(sql, [displayname, new Date(birthday), gender, phone, username])
}
module.exports = {
  createAccount,
  getAccountByUsername,
  updateAccountByUsername
}