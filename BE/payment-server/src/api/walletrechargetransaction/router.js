const express = require('express')
const  routers =express.Router()
const controller = require('./controller')
const {verifyAdmin, verifyAllRole} = require('../../middleware/veryfiedAuth')
routers.get('/getRevenus',verifyAdmin,controller.getRevenues)
routers.get('/getAllTransaction',verifyAdmin,controller.getAllController)
module.exports = routers