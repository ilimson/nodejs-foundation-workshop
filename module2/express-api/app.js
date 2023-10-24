require("dotenv").config();
const app = require("express")();
const httpServer = require("http").createServer(app);

const initializeDatabase = require("./config/database.config");
const initializeRoutes = require("./routes");
const initializeCronJobs = require("./cronjob");
const initializeWebSockets = require("./config/socket.config");
const {
  expressCommonMiddleware,
  errorHandlerMiddleware,
  swaggerDocsMiddleware,
  loggerMiddleware,
} = require("./middleware");

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
 * intialize web sockets
 *
 * @references
 *  https://socket.io/docs/v3/server-initialization/
 */
const socket = initializeWebSockets(httpServer);

/**
 * Initialize app routes
 */
app.use("/api", initializeRoutes());
app.use(
  "/api/docs",
  swaggerDocsMiddleware({
    title: "Express API",
    basePath: "/api",
    apis: ["./routes/sensor.route.js"],
  })
);

/**
 * Initialize cronjobs
 */
initializeCronJobs(socket);

/**
 * implement error handling
 */
app.use(errorHandlerMiddleware());

/**
 * serve express app
 */
const PORT = process.env.APP_PORT || 8000;

httpServer.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.ENVIRONMENT} mode on port ${PORT}`
  );
});
