const db = require('../../utils/mysqldb')

const getMessageById = async (messageid) => {
  const sql = "SELECT * FROM message WHERE messageid = ?;"
  return await db.queryOne(sql, [messageid])
}

const getMessageOfGroup = async (groupid) => {
  const sql = "SELECT * FROM message WHERE groupid = ? ORDER BY update_time DESC;"
  return await db.queryMulti(sql, [groupid])
}

const getLastMessageOfGroup = async (groupid) => {
  const sql = "SELECT * FROM message WHERE groupid = ? ORDER BY update_time DESC LIMIT 1;"
  return await db.queryOne(sql, [groupid])
}

module.exports = {
  getMessageById,
  getMessageOfGroup,
  getLastMessageOfGroup
}
