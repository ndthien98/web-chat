const groupService = require('./groupService')
const uuid = require('uuid').v4

const createGroup = async (req, res, next) => {
  const listUsersId = req.body.listUsersId
  const userid = req.auth.userid

  listUsersId.filter(e => e != userid)
  listUsersId.push(req.auth.userid)

  try {
    await groupService.createGroup(listUsersId)
    req.notifySuccess('Tạo thành công')
  } catch (error) {
    req.notifyFail('Tạo thất bại')
  }

}
const getGroupById = async (req, res, next) => {
  const groupid = req.params.groupid
  const results = await groupService.getGroupById(groupid)
  res.send({
    status: 1,
    ...results
  })

}

const updateGroupImage = async (req, res, next) => {
  const groupid = req.body.groupid
  const groupimage = req.body.groupimage
  await groupService.updateImage(groupimage, groupid)
  req.notifySuccess("Successfully!")
}

const updateGroupName = async (req, res, next) => {
  const groupid = req.body.groupid
  const groupname = req.body.groupname
  await groupService.updateName(groupname, groupid)
  req.notifySuccess("Successfully!")
}

module.exports = {
  createGroup,
  getGroupById,
  updateGroupName,
  updateGroupImage
}
