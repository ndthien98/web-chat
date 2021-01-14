const io = require('socket.io')
const express = require('express')
const http = require('http')
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

// Initialized RESTful API
const app = express()
const server = http.createServer(app)
app.use(corsMiddlware)
app.use(JSONBodyParser)
app.use(notifySuccess)
app.use(notifyFail)
app.use(logger)

const routers = require('./routers')
app.get('/api', (req, res) => res.send('API running'))
routers.forEach(e => {
  app.use(e.path, e.router)
})

app.use(catchException)
app.use('*', (req, res) => { req.notifyFail('Unknown router: ' + req.originalUrl) })

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

// use Message Socket
messageSocket(socketServer.getInstance());

// start server 
const PORT = process.env.PORT || 5000
server.listen(PORT, (e) => {
  if (e) console.log('Error while start server:', e)
  console.log(`Listen at ${PORT}`)
});
