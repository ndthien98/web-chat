const io = require('socket.io')
const express = require('express')
const http = require('http')
const socketInit = require('./sockets')
const path = require('path')

// middlewares
const JSONBodyParser = require('body-parser').json()
const corsMiddlware = require('cors')()
const catchException = require('./middlewares/errorHandle').catchException
const notifySuccess = require('./middlewares/success').notifySuccess
const notifyFail = require('./middlewares/success').notifyFail

// utilities 
const logger = require('./middlewares/logger')
const security = require('./utils/security')

require('dotenv').config() // init config from .env file 
require('./utils/mysqldb') // init database connection 

// Initialized RESTful API
const app = express()
const server = http.createServer(app)

app.use(corsMiddlware)
app.use(JSONBodyParser)
app.use(notifySuccess)
app.use(notifyFail)
// app.use(logger)

// static serve file in upload
app.use('/api/uploads', express.static(path.join(__dirname, '../uploads')));

const routers = require('./routers')
const { check } = require('express-validator')
app.get('/api', (req, res) => res.send('API running'))

routers.forEach(e => {
  app.use(`/api${e.path}`, e.router)
  console.log(e.path)
})

app.use(catchException)

app.use('*', (req, res) => { req.notifyFail('Unknown router: ' + req.originalUrl) })

// Initialized Socket Server 
const socketServer = (function () {
  var instance;
  function init() {
    console.log('init socket server')
    instance = io(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
      }
    })
    instance.use((socket, next) => {
      let check = security.verifyToken(socket.handshake.auth.token)
      if (check) {
        socket.userid = check.userid
        return next();
      }
      console.log('auth fail, close socket')
      socket.close()
      return next(new Error('socket authentication error'));
    })
    return instance
  };
  return {
    getInstance: () => instance || init()
  };
})();

// use Message Socket
socketInit(socketServer.getInstance());

// start server 
const PORT = process.env.PORT || 5000
server.listen(PORT, (e) => {
  if (e) console.log('Error while start server:', e)
  console.log(`Listen at ${PORT}`)
});
