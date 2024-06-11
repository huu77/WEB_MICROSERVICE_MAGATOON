const express = require('express')
const routers = express.Router()
const controller = require('./controller')
const { verifyUser } = require('../../middleware/veryfiedAuth')
routers.get('/getWallet', verifyUser, controller.getWallerController)
routers.get('/getUserWallet/:id', verifyUser, controller.getOneWallerController)
routers.patch('/updateWallet', verifyUser, controller.updateBalance)

module.exports = routers