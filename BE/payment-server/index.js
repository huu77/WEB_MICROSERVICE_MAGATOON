const express = require("express");
const app = express();

const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");

app.use(morgan("combined"));
app.use(helmet());
app.use(compression());

require("dotenv").config();

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use('/api/v1/payment', require('./src/routers'))

const PORT = process.env.PORT;
// rabbit mq run
require('./src/rabitMQ/createNewWallet')

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
