const sensorsCron = require("./sensors.cron");

const initializeCronJobs = () => {
  sensorsCron();
};

module.exports = initializeCronJobs;
