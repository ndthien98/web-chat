const uploadImage = async (req, res, next) => {
  // const { userId } = req;
  // console.log(req.file.filename);
  // await dbAccess.updateAvatar(req.file.filename, userId);
  // res.ok();
  res.send({
    status: 1,
    link: '/uploads/' + req.file.filename
  })
}
module.exports = {
  uploadImage
}