const express = require('express')
const Messages = require('../controllers/message.controller')
const message = express()

//get Message
message.get('/:id',Messages.GetMessage)

//Send message
message.post('/send/:id',Messages.sendMessage)


module.exports = message