const logger = require("../config/winston.config");

module.exports = (req, res, next) => {
  logger.info(`Handled ${req.method} request from ${req.originalUrl}`);
  next();
};
