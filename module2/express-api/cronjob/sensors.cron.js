const cron = require("node-cron");
const logger = require("../config/winston.config");
const { SensorData } = require("../models");

const sensorsCron = () => {
  logger.info("Generating simulated sensor data...");
  // This cron job is set to run every 10 seconds.
  cron.schedule("*/10 * * * * *", async () => {
    try {
      // Create new sensor data
      const newSensorData = new SensorData({
        temperature: Math.random() * 15 + 20, // random temperature between 20 and 35
        humidity: Math.floor(Math.random() * 100), // random humidity
        pressure: Math.floor(Math.random() * 50) + 970, // random pressure between 970 and 1020
        airQuality: "Good",
        location: [], // location: `Location${Math.floor(Math.random() * 3) + 1}`, // random location
      });
      const createdSensorData = await newSensorData.save();
      logger.info(`Simulated data inserted:`, createdSensorData);
    } catch (err) {
      logger.error(`Error inserting simulated data`, err);
    }
  });
};

module.exports = sensorsCron;
