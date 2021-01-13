const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uuid = require('uuid').v4
const redis = require('./redisdb')

const REFRESH_TOKEN_PREFIX = process.env.REFRESH_TOKEN_PREFIX || 'rftkpr'
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'jwt'
const JWT_EXPIRES_TIME = '30d'
const SALT_ROUND = 10

const generatePassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUND)
  console.log(hashedPassword);
  return hashedPassword;
}

const generateToken = data => {
  return jwt.sign(data, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_TIME,
  });
}
const generateRefreshToken = () => {
  const refreshToken = uuid()
  return refreshToken
}

const verifyPassword = async (password, encryptPassword) => {
  const result =
    await bcrypt.compare(
      password,
      encryptPassword
    );
  return result;
};

const verifyToken = token => {
  const data = jwt.verify(token, JWT_SECRET_KEY);
  return data
}

const verifyRefreshToken = async (token, refreshToken) => {
  const oldToken = await redis.getAsync(`${REFRESH_TOKEN_PREFIX}${refreshToken}`)
  console.log(oldToken)
  console.log(token)
  console.log(refreshToken)
  return oldToken === token
}
const refreshToken = async (token, refreshToken) => {
  const data = jwt.verify(token, JWT_SECRET_KEY, { ignoreExpiration: true });
  const newToken = generateToken(data)
  const newRefreshToken = await generateRefreshToken(newToken)
  return {
    token: newToken,
    refreshToken: newRefreshToken
  }
}
module.exports = {
  generatePassword,
  verifyPassword,
  generateToken,
  verifyToken,
  generateRefreshToken,
  verifyRefreshToken,
  refreshToken
}