const tryCatch = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (err) {
    next(err);
  }
}

const catchException = (err, req, res, next) => {
  console.log(err)
  if (typeof (err) === 'string') {
    req.notifyFail(err)
  } else {
    res.status(500).send('Something happened!');
  }

}

module.exports = {
  tryCatch,
  catchException
}