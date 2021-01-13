const currentUser = []

module.exports = (socketServer) => {
  socketServer.on('connection', (socketClient) => {
    console.log('client connected')
    socketClient.on('disconnect', data => {
      console.log('client dis', data)
    })
    currentUser.push(socketClient)
  })
}
