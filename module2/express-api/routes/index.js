const Router = require("express").Router({ mergeParams: true });

const initializeRoutes = (io) => {
  Router.use("/sensors", require("./sensor.route"));

  return Router;
};

module.exports = initializeRoutes;
