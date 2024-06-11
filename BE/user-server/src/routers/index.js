const express = require("express");
const routes = express.Router();

routes.use(require('../api/login/router'))
routes.use(require('../api/register/router'))
routes.use(require('../api/user/router'))
routes.use(require('../api/imgage/router'))

module.exports = routes;
