const io = require('socket.io')
const express = require('express')
const http = require('http')
// sockets
const messageSocket = require('./sockets/message')
// middlewares
const JSONBodyParser = require('body-parser').json()
const corsMiddlware = require('cors')()
const catchException = require('./middlewares/errorHandle').catchException
const notifySuccess = require('./middlewares/success').notifySuccess
const notifyFail = require('./middlewares/success').notifyFail
const logger = require('./middlewares/logger')
require('dotenv').config()
require('./utils/mysqldb')
// routers
const authRouter = require('./routers/auth')
const accountRouter = require('./routers/account')
// Initialized RESTful API
const app = express()
const server = http.createServer(app)
app.use(corsMiddlware)
app.use(JSONBodyParser)
app.use(notifySuccess)
app.use(notifyFail)
app.use(logger)

app.get('/api', (req, res) => res.send('API running'))
app.use('/api/auth', authRouter)
app.use('/api/account', accountRouter)

app.use(catchException)
app.use('*', (req, res) => { req.notifyFail('Unknown link') })

// Initialized Socket Server 
var socketServer = (function () {
  var instance;
  function init() {
    instance = io(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
      }
    })
    return instance
  };
  return {
    getInstance: () => instance || init()
  };
})();

messageSocket(socketServer.getInstance());

const PORT = process.env.PORT || 5000
server.listen(PORT, (e) => {
  if (e) console.log('Error while start server:', e)
  console.log(`Listen at ${PORT}`)
});
