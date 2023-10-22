const Router = require("express").Router({ mergeParams: true });

const initializeRoutes = () => {
  Router.use("/sensors", require("./sensors.routes"));

  return Router;
};

module.exports = initializeRoutes;
