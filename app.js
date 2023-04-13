const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const notFound = require("./src/configs/middlewares/notFound");
const errorHandler = require("./src/configs/middlewares/errorHandler");
const userRoutes = require("./src/routes");

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`listening 🔥: ${server.address().port}`);
});
