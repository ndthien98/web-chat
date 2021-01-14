
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
      socketServer.emit('new-message', 'socket: ' + data)
    })
  })

}