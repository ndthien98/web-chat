
const security = require('../utils/security')
const messageService = require('../routers/message/messageService')
let onlineUser = []

module.exports = (socketServer) => {
  socketServer.on('connection', (socketClient) => {
    
    onlineUser.push(socketClient)
    console.log('client connected', socketClient.userid)
    console.log(onlineUser.map(e => e.userid))

    socketClient.on('disconnect', data => {
      onlineUser = onlineUser.filter(userSocket => userSocket.userid !== socketClient.userid)
      console.log('client disconnect')
    })

    socketClient.on('new-message', async newMessage => {
      await messageService.createMessage(newMessage)
      onlineUser.forEach((e, i) => {
        console.log('id:' + i + e.userid)
        if (e.userid === newMessage.receiver) {
          e.emit('new-message', newMessage)
        }
      })
      console.log('on:new-message:', newMessage)
    })
  })

  // gửi tin nhắn cho group
  // check người dùng trong group xem có ai online hay không 
  // online - gửi tin nhắn cho mọi người
  // offline - lưu tin nhắn lại


  // lưu tin nhắn vào database 
}
