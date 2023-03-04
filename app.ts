const express = require("express");

const routes = require("./src/rest/routes/index");

export let app = express();

app.use("/", routes);

app.listen(3333, () => {
  console.log("listening on port 3333 🔥");
});
