const express = require('express')
const  routersImage =express.Router()
const fileUploader = require('../../config/cloudinary');
const controller = require('./controller')
const {verifyAllRole} = require('../../middleware/veryfiedAuth');
const producer = require('../../rabitMQ/createNewWallet/producer');
routersImage.patch('/cloudinary-upload',verifyAllRole, fileUploader.single('image'), controller.uploadController);
 
 
module.exports = routersImage

// tham khao : https://viblo.asia/p/tich-hop-cloud-services-cho-image-upload-trong-nodejs-va-react-web-app-yMnKM01a57P
//https://console.cloudinary.com/console/c-1dcf3f2d81def621a60cd5f617943b/media_library/folders/home?view_mode=mosaic