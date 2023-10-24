const logger = require("../config/winston.config");
const { SensorData } = require("../models");
const { emailService } = require("../services");

module.exports.getAllSensorData = async (req, res, next) => {
  try {
    // console.log({
    //   socket: req.socket,
    // });

    // req.socket.emit("sensor:getAll", { data: "hello world!" });

    const sensorData = await SensorData.find();

    const message = `Successfully fetched sensor data.`;
    logger.info(message);

    res.status(200).json({
      message,
      data: sensorData,
    });
  } catch (err) {
    logger.error(`SensorControll getAllSensorData failed`);
    next(err);
  }
};

module.exports.getSensorDataById = async (req, res, next) => {
  try {
    const { sensorId } = req.params;

    const sensorData = await SensorData.findById(sensorId);

    if (!sensorData) {
      const message = `Sensor data not found.`;
      logger.info(message);

      res.status(404).json({
        message,
        data: sensorData,
      });
    }

    const message = `Successfully fetched sensor data.`;
    logger.info(message);

    res.status(200).json({
      message,
      data: sensorData,
    });
  } catch (err) {
    logger.error(`[SensorController.getSensorDataById]`, err);
    next(err);
  }
};

module.exports.createSensorData = async (req, res, next) => {
  try {
    const { temperature, humidity, pressure, airQuality, location } = req.body;

    /**
     * add business logic here if needed
     */

    const newSensorData = new SensorData({
      temperature,
      humidity,
      pressure,
      airQuality,
      location,
    });

    const createdSensorData = await newSensorData.save();

    emailService.sendEmail({
      to: "iv4n.d3v@gmail.com",
      subject: "Express-API Sensor Data Creation",
      text: "and easy to do anywhere, even with Node.js",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    });

    const message = `Successfully created sensor data.`;
    logger.info(message);

    res.status(201).json({
      message,
      data: createdSensorData,
    });
  } catch (err) {
    next(err);
  }
};
