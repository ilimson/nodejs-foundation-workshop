const logger = require("../config/winston.config");

// const errorHandlerMiddleware = (err, req, res, next) => {
//   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//   res.status(statusCode);
//   res.json({
//     message: err.message,
//     stackTrace: process.env.NODE_ENV === "production" ? null : err.stack,
//   });

//   logger.error(
//     `${statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
//   );
// };

// module.exports = errorHandlerMiddleware;

const { isCelebrateError } = require("celebrate");
/**
 *
 * @reference
 *  https://www.npmjs.com/package/celebrate#segments
 *  https://stackoverflow.com/questions/55954369/how-to-manage-self-created-error-message-instead-of-using-default-celebrate-hap
 */
module.exports = () => (err, req, res, next) => {
  if (isCelebrateError(err)) {
    logger.error(err);

    /**
     * celebrate error 'details' is a Map()
     * console.log(err);
     */
    const body = err.details.get("body")
      ? err.details.get("body").details.map((field) => field.message)
      : false;

    const params = err.details.get("params")
      ? err.details.get("params").details.map((field) => field.message)
      : false;

    const query = err.details.get("query")
      ? err.details.get("query").details.map((field) => field.message)
      : false;

    const headers = err.details.get("headers")
      ? err.details.get("headers").details.map((field) => field.message)
      : false;

    return res.status(400).json({
      message: "Validation Error",
      data: {
        ...(body ? { body } : {}),
        ...(params ? { params } : {}),
        ...(query ? { query } : {}),
        ...(headers ? { headers } : {}),
      },
    });
  }

  logger.error(err);
  // logger.error(err.stack);
  return res.status(err.status || err.code || 500).json({
    message:
      err.status === 500
        ? "There was a problem with the server. Kindly contact customer support"
        : err.message,
  });
};
