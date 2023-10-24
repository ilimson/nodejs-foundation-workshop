const initializeCronJobs = (socket) => {
  require("./sensor.cron")(socket);
};

module.exports = initializeCronJobs;
