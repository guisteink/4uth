import express from "express";

import { app } from "../app";

function initConfigs(): void {
  app.use(express.json());
}

initConfigs();
