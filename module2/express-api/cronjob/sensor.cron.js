const cron = require("node-cron");
const logger = require("../config/winston.config");
const { emailService } = require("../services");
const { SensorData } = require("../models");

const sensorCron = (socket) => {
  logger.info("Generating simulated sensor data...");

  const temperatureThreshold = 40; // Set your temperature threshold here (e.g., 40°C)

  // This cron job is set to run every 10 seconds.
  cron.schedule("*/10 * * * *", async () => {
    try {
      const temperature = randomTemperature(80);

      // Create new sensor data
      const newSensorData = new SensorData({
        temperature,
        humidity: Math.floor(Math.random() * 100), // random humidity
        pressure: Math.floor(Math.random() * 50) + 970, // random pressure between 970 and 1020
        airQuality: randomAirQuality(),
        location: [
          Math.floor(Math.random() * 100),
          Math.floor(Math.random() * 100),
          Math.floor(Math.random() * 100),
        ],
      });

      const createdSensorData = await newSensorData.save();
      logger.info(`Simulated data inserted:`, createdSensorData);

      if (temperature > temperatureThreshold) {
        console.log({
          message: `Temperature Threshold Exceeded ${temperature}°C`,
        });

        // Send a notification because the temperature exceeds the threshold
        emailService.sendEmail({
          to: process.env.SENDGRID_EMAIL_RECEIVER,
          subject: "Temperature Threshold Exceeded",
          text: `Temperature exceeded ${temperatureThreshold}°C. Current temperature: ${temperature}°C`,
        });
      }

      socket.emit("sensor:cron", async () => {
        try {
          const sensorData = await SensorData.find();

          return {
            data: sensorData,
          };
        } catch (err) {
          logger.error(`sensor:cron getAllSensorData failed`, err);
        }
      });
    } catch (err) {
      logger.error(`Error inserting simulated data`, err);
    }
  });
};

const randomAirQuality = () =>
  ["Good", "Moderate", "Poor"][Math.floor(Math.random() * 3)];

const randomTemperature = (percentageExceeding40) => {
  const baseTemperature = Math.random() * 100;

  const temprature =
    Math.random() * 100 < percentageExceeding40
      ? baseTemperature + Math.random() * (100 - baseTemperature) // Temperature exceeds 40 degrees
      : baseTemperature;

  return parseFloat(temprature).toFixed(2);
};

module.exports = sensorCron;
