const db = require('../../utils/mysqldb')

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
  if (account) delete account.password
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

const findAccount = async (keyword) => {
  const sql = `
  SELECT * FROM account 
  WHERE username LIKE ? OR displayname LIKE ?; 
  `
  const accounts = await db.queryMulti(sql, [`%${keyword}%`, `%${keyword}%`])
  accounts.forEach((_, i) => {
    delete accounts[i].password
  });
  return accounts
}

const updateAvatar = async (username, avatar) => {
  const sql = `
  UPDATE account
  SET 
    avatar = ?
  WHERE username = ?;
  `;
  await db.queryNone(sql, [avatar, username])
}

const getAllAccount = async () => {
  const sql = `SELECT * FROM account`;
  const accounts = await db.queryMulti(sql);
  accounts.forEach((_,index) => {
    delete accounts[index].password
  });
  return accounts
}
module.exports = {
  createAccount,
  getAccountByUsername,
  updateAccountByUsername,
  findAccount,
  updateAvatar,
  getAllAccount
}