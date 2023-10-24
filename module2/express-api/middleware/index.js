module.exports = {
  expressCommonMiddleware: require("./expressCommon.middleware"),
  errorHandlerMiddleware: require("./errorHandler.middleware"),
  requestValidationMiddleware: require("./requestValidation.middleware"),
  Joi: require("celebrate").Joi,
  swaggerDocsMiddleware: require("./swaggerDocs.middleware"),
  loggerMiddleware: require("./logger.middleware"),
};
