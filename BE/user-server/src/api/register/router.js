

const express = require('express')
const controller = require('./controller')
const  routersRegister =express.Router()
routersRegister.post('/register',controller.register)
routersRegister.get('/verified',controller.verified)
module.exports = routersRegister