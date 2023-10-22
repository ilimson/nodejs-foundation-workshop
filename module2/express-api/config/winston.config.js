const { createLogger, format, transports } = require("winston");

// Transports
const transportDefinitions = {
  // Normal file logger
  file: {
    level: "info",
    filename: "app.log",
    dirname: "./logs/",
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 1,
  },
  // Logging to console
  console: {
    level: "info",
    handleExceptions: true,
    json: false,
  },
};

// timezone function winston calls to get timezone
// const timezoned = () =>
//   new Date().toLocaleString("en-US", {
//     timeZone: TIMEZONE,
//   });

// logger object with above defined options
const logger = createLogger({
  transports: [
    new transports.File(transportDefinitions.file),
    new transports.Console(transportDefinitions.console),
  ],
  format: format.combine(
    format.simple(),
    format.timestamp(),
    format.printf((logObject) => {
      return `[${logObject.timestamp}] [${
        logObject.level
      }]: ${logObject.message.trim()}`;
    })
  ),
  exitOnError: false,
});

// logger.stream = {
//   write(message) {
//     logger.info(message);
//   },
// };

module.exports = logger;
