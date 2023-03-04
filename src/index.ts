const express = require("express");

const app = require("../app");
const connect = require("../config/database");
// const routes = require("./rest/routes/index");

async function initConfigs(): Promise<void> {
  await connect();
  app.use(express.json());
};

// async function initRoutes(): Promise<void> {
//   app.use("/", routes.router);
// }

initConfigs();
// initRoutes();
