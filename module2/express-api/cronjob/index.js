const sensorsCron = require("./sensors.cron");

const initializeCronJobs = (io) => {
  sensorsCron(io);
};

module.exports = initializeCronJobs;
