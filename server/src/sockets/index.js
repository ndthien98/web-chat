
const security = require('../utils/security')
const messageService = require('../routers/message/messageService')
let onlineUser = []

module.exports = (socketServer) => {
  socketServer.on('connection', (socketClient) => {

    onlineUser.push(socketClient)
    console.log('client connected', socketClient.userid)
    console.log(onlineUser.map(e => e.userid))

    socketClient.emit('online-user', onlineUser.map(e => e.userid))

    onlineUser.forEach(userSocket => {
      userSocket.emit('join', socketClient.userid)
    })

    socketClient.on('disconnect', () => {
      onlineUser = onlineUser.filter(userSocket => userSocket.userid !== socketClient.userid)
      onlineUser.forEach(userSocket => {
        userSocket.emit('leave', socketClient.userid)
      })
      console.log('client disconnect')
    })

    socketClient.on('new-message', async newMessage => {
      await messageService.createMessage(newMessage)

      onlineUser.forEach((e, i) => {
        if (e.userid === newMessage.receiver) {
          e.emit('new-message', newMessage)
        }
      })
      console.log('on:new-message:', newMessage)
    })

    socketClient.on('buzz', userid => {
      onlineUser.forEach(userSocket => {
        if (userSocket.userid === userid) userSocket.emit('buzz', socketClient.userid)
      })
    })

  })
}

