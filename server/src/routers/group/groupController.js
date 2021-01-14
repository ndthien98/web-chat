const groupService = require('./groupService')
const uuid = require('uuid').v4

const createGroup = async (req, res, next) => {
  const data = {
    groupid: uuid(),
    list_user: ['id123', 'id456']
  }
  try {
    await groupService.createGroup(data)
    req.notifySuccess('Tạo thành công')
  } catch (error) {
    req.notifyFail('Tạo thất bại')
  }
}

module.exports = {
  createGroup,
}
