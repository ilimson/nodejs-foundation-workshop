const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

module.exports = (opts = {}) => {
  const title = opts.title || "";
  const basePath = opts.basePath || "";
  const apis = opts.apis || ["./app/app.route.js"];

  if (!title) {
    throw new Error("title is required");
  }

  const swaggerSpec = swaggerJsDoc({
    swaggerDefinition: {
      info: {
        title: title,
        version: "1.0.0", // Version (required)
      },
      produces: ["application/json"],
      consumes: ["application/json"],
      securityDefinitions: {
        Authorization: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
        },
      },
      basePath: basePath,
    },
    apis,
  });

  return [swaggerUi.serve, swaggerUi.setup(swaggerSpec)];
};
