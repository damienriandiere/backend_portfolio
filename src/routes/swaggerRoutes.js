const express = require("express");
const swaggerUI = require("swagger-ui-express");
const yaml = require("yaml");
const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  const file = fs.readFileSync(
    path.resolve(__dirname, "../models/swagger.yaml"),
    "utf-8"
  );
  const swaggerDocument = yaml.parse(file);

  const projectRoutes = express.Router();
  projectRoutes.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocument)
  );

  app.use(projectRoutes);

  console.log("info", "Swagger loaded");
};
