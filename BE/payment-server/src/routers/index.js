const express = require("express");
 
const routes = express.Router();

 
routes.use(require('../api/invoice/router'))
routes.use(require('../api/wallet/router'))
routes.use(require('../api/walletrechargetransaction/router'))

routes.use(require('../api/serverpackage/router'))
routes.use(require('../api/sevicepackageprice/router'))
routes.use(require('../api/payment/router'))
routes.use(require('../api/servicepackagetransaction/router'))

module.exports = routes;
