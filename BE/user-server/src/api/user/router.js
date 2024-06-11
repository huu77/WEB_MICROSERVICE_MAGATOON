const express = require('express')
const  routersUser =express.Router()
const controller = require('./controller')
const {verifyAllRole,verifyAdmin} = require('../../middleware/veryfiedAuth')
routersUser.get('/user',verifyAllRole,controller.getUserController)
routersUser.get('/users',verifyAdmin,controller.getAllUsersController)
routersUser.get('/profile',verifyAllRole,controller.getProfileController)
module.exports = routersUser