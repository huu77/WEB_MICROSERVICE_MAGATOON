const express = require('express')
const  routers =express.Router()
const controller = require('./controller')
const {  verifyUser} = require('../../middleware/veryfiedAuth')
routers.post('/createNewServiceTransaction',verifyUser,controller.CreatServiceTransaction)
routers.get('/thanks_buyservice',verifyUser,controller.returnThank)
module.exports = routers