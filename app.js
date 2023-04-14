require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const notFound = require("./src/configs/middlewares/notFound");
const errorHandler = require("./src/configs/middlewares/errorHandler");
const routes = require("./src/routes");
const { connectToMongodb } = require("./src/configs/database");

const app = express();
const PORT = process.env.PORT || 3333;
const isPrd = !!process.env.NODE_ENV;

require("./src/configs/passport");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (isPrd) connectToMongodb(process.env.MONGODB_URI);

app.use("/", routes);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`listening 🔥: ${server.address().port}`);
});
