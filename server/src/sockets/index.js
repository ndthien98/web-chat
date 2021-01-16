
const security = require('../utils/security')

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

    socketClient.on('new-message', data => {
      socketClient.emit('new-message', 'socket: ' + data)
      // socketServer.emit('new-message', 'socket: ' + data)
      console.log('on:new-message:', data)
    })
  })

  // gửi tin nhắn cho group
  // check người dùng trong group xem có ai online hay không 
  // online - gửi tin nhắn cho mọi người
  // offline - lưu tin nhắn lại


  // lưu tin nhắn vào database 
}
