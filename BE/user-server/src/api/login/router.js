const express = require('express')
const  routersLogin =express.Router()
const controller = require('./controller')

routersLogin.post('/login',controller.loginController)
routersLogin.post('/refreshToken',controller.refreshTokenController)
routersLogin.post('/loginGoogle',controller.loginGoogleController)



module.exports = routersLogin