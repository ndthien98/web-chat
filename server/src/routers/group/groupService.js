const db = require('../../utils/mysqldb')
const uuid = require('uuid').v4

const createGroup = async (listUsersId) => {
  const transaction = await db.beginTransaction()
  try {
    const sql = "SELECT displayname FROM account WHERE userid = ?;"
    const newID = uuid()
    const sql1 = "INSERT INTO `group`(groupid, groupname) VALUE(?,'Nhóm chat mới');"
    const sql2 = "INSERT INTO `groupdetail`(groupid, userid) VALUE(?,?);"
    await db.queryNone(sql1, newID, transaction)
    listUsersId.forEach(async userid => {
      await db.queryNone(sql2, [newID, userid], transaction)
    });
    await db.commitTransaction(transaction)
  } catch (error) {
    await db.rollbackTransaction(transaction)
    throw error
  }
}

const getGroupById = async (groupid) => {
  const transaction = await db.beginTransaction()
  try {
    const sql = "SELECT * FROM `group` WHERE groupid = ?;"
    const group = await db.queryMulti(sql, [groupid], transaction)
    const sql2 = "SELECT * FROM groupdetail, account WHERE groupid = ? AND groupdetail.userid=account.userid;"
    const users = await db.queryMulti(sql2, [groupid], transaction)
    users.forEach((_, index) => {
      delete users[index].password
    });
    await db.commitTransaction(transaction)
    return {
      group,
      users
    }
  } catch (error) {
    await db.rollbackTransaction(transaction)
    throw error
  }
}

const updateName = async (groupname, groupid) => {
  const sql = `
  UPDATE \`group\`
  SET
  groupname = ? 
  WHERE groupid = ?;
  `
  await db.queryNone(sql, [groupname, groupid])
}

const updateImage = async (groupimage, groupid) => {
  const sql = `
  UPDATE \`group\`
  SET
  group_image = ? 
  WHERE groupid = ?;
  `
  await db.queryNone(sql, [groupimage, groupid])
}


module.exports = {
  createGroup,
  getGroupById,
  updateImage,
  updateName
}