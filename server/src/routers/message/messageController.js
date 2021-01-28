const messageService = require('./messageService')


const getAllMessageByUsername = async (req, res, next) => {
  const user1 = req.auth.userid // current login user
  const user2 = req.params.userid // parameter user 
  
  const messages = await messageService.getMessageBetween(user1, user2)
  res.send({ messages })
}
module.exports = {
  getAllMessageByUsername
}
