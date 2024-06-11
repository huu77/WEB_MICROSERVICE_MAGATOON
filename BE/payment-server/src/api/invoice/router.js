const express = require('express')
const  routers =express.Router()
const controller = require('./controller')
const {verifyAllRole, verifyUser} = require('../../middleware/veryfiedAuth')
 
routers.get('/getAllListStoryOfUser',verifyAllRole,controller.getAllListStoryOfUser)
routers.get('/getAll',verifyAllRole,controller.getAll)
routers.post('/buy',verifyUser,controller.buyController)
module.exports = routers