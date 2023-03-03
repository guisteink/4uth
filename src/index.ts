const express = require("express");

const app = require("../app");
const connect = require("../config/database");

async function initConfigs(): Promise<void> {
  await connect();
  app.use(express.json());
};

initConfigs();
