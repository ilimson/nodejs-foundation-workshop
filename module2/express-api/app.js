require("dotenv").config();
const express = require("express");
const initializeDatabase = require("./config/database.config");
const initializeRoutes = require("./routes");
const initializeCronJobs = require("./cronjob");
const {
  expressCommonMiddleware,
  errorHandlerMiddleware,
  jwtDecoderMiddleware,
  swaggerDocsMiddleware,
  loggerMiddleware,
} = require("./middleware");

const app = express();

/**
 * initialize database connection
 */
initializeDatabase();

/**
 * use essential express middlewares
 */
app.use(expressCommonMiddleware());

/**
 * implement logging
 */
app.use(loggerMiddleware);

/**
 * health checks
 */
app.all("/", (req, res) => res.send("express-api is running!"));
app.get("/healthcheck", (req, res) => res.send("express-api is running!"));

/**
 * Initialize app routes
 */
const routes = initializeRoutes();
app.use("/api", routes);

/**
 * Initialize cronjobs
 */
initializeCronJobs();

/**
 * implement error handling
 */
app.use(errorHandlerMiddleware());

/**
 * serve app
 */
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running in production mode on port ${PORT}`);
});
