
const express = require('express')
const  routers =express.Router()
const controller = require('./controller')
const {verifyAdmin, verifyAllRole} = require('../../middleware/veryfiedAuth')
 
routers.get('/getOnePrice',verifyAllRole,controller.getOne)
routers.get('/getAllOfIdService',verifyAllRole,controller.getAllOfIdService)
routers.post('/createPrice',verifyAdmin,controller.CreateNew)
routers.patch('/updatePrice',verifyAdmin,controller.Update)

routers.delete('/deletePrice',verifyAdmin,controller.deletePrice)
module.exports = routers