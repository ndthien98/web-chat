const messageService = require('./messageService')

const getMessageById = async (req, res, next) => {
  const messageid = req.params.messageid;
  const message = await messageService.getMessageById(messageid)
  res.send({
    status: 1,
    message
  })
}

const getMessageOfGroup = async (req, res, next) => {
  const groupid = req.query.groupid;
  const message = await messageService.getMessageOfGroup(groupid)
  res.send({
    status: 1,
    message
  })
}

const getLastMessageOfGroup = async (req, res, next) => {
  const groupid = req.query.groupid;
  const message = await messageService.getLastMessageOfGroup(groupid)
  res.send({
    status: 1,
    message
  })
}

module.exports = {
  getMessageById,
  getMessageOfGroup,
  getLastMessageOfGroup
}
