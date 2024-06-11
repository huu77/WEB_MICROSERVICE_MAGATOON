const express = require("express");
const app = express();

const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");


app.use(morgan("combined"));
app.use(helmet());
app.use(compression());

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', require('./src/routers'))
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
