const db = require('../../utils/mysqldb')

const createGroup = async (data) => {
  const sql1 = 'INSERT INTO `group`(groupid, displayname, birthday, gender, phone) VALUE(?,?,?,?,?);'
}
module.exports = {
  createGroup
}