const swaggerUI = require("swagger-ui-express");
const swaggerFile = require("../swagger/swagger_output.json");

module.exports = (app) => {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

  console.log("info", "Swagger loaded");
};
