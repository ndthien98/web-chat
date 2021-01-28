const db = require('../../utils/mysqldb')

const getMessageBetween = async (sender, receiver) => {
  const sql = `SELECT * FROM message WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?) `;
  const messages = await db.queryMulti(sql, [sender, receiver, receiver, sender])
  return messages
}

const createMessage = async (message) =>{
  const sql = `INSERT INTO message(messageid, sender, receiver, content, type) value(uuid(), ? , ? , ? , ? )`
  await db.queryNone(sql,[message.sender, message.receiver, message.content, message.type ])
}
module.exports = {
  getMessageBetween,
  createMessage
}
