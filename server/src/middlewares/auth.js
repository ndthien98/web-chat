const security = require('../utils/security')

const requireLogin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(` `)[1]; // `Bearer thiehtiheithie`
    const decodedToken = security.verifyToken(token);
    req.auth = decodedToken;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).send({
      status: 0,
      message: 'Xác thực thất bại'
    })
  }
}

module.exports = {
  requireLogin
}