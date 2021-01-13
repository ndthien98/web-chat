const notifySuccess = (req, res, next) => {
  req.notifySuccess = (message) => {
    res.send({
      status: 1,
      message: message || 'Successfully'
    })
  }
  next();
}

const notifyFail = (req, res, next) => {
  req.notifyFail = (message) => {
    res.status(400).send({
      status: 0,
      message: message || 'Failed!'
    })
  }
  next();
}

module.exports = {
  notifySuccess,
  notifyFail,
}
