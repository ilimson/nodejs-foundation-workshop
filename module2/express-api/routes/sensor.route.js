const Router = require("express").Router({ mergeParams: true });
const { requestValidationMiddleware, Joi } = require("../middleware");
const { sensorController } = require("../controllers");

/**
 * @swagger
 * /sensors:
 *   get:
 *     tags:
 *       - "Sensors"
 *     summary: Get all sensor data
 *     description: Retrives all the sensor data
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           $ref: "#/definitions/getAllSensorDataResponse"
 */
Router.route("/").get(sensorController.getAllSensorData);

/**
 * @swagger
 * /sensor/{sensorId}:
 *   get:
 *     tags:
 *       - Sensors
 *     summary: Get Sensor Data by ID
 *     description: Retrieve sensor data by providing a sensorId.
 *     parameters:
 *       - in: path
 *         name: sensorId
 *         schema:
 *           type: string
 *           pattern: "^[0-9a-fA-F]{24}$"
 *         required: true
 *         description: The ID of the sensor data to retrieve (must be a valid MongoDB ObjectId).
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           $ref: "#/definitions/SensorData"
 *       404:
 *         description: Sensor data not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the sensor data was not found.
 *                 data:
 *                   type: null
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating an internal server error.
 *                 error:
 *                   type: string
 *                   description: A description of the error.
 */
Router.route("/:sensorId").get(
  requestValidationMiddleware({
    params: {
      /**
       * @refernce
       *  https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages
       */
      sensorId: Joi.string()
        // valid mongodb objectId pattern
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          "string.pattern.base": `"sensorId" should be a valid mongodb objectId`,
        }),
    },
  }),
  sensorController.getSensorDataById
);

/**
 * @swagger
 * /sensor/{sensorId}:
 *   post:
 *     tags:
 *       - Sensors
 *     summary: Create Sensor Data
 *     description: Create sensor data by providing inputing it;s fields.
 *     parameters:
 *       - in: body
 *         name: body
 *         schema:
 *          $ref: "#/definitions/createSensorDataRequestBody"
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           $ref: "#/definitions/SensorData"
 *       404:
 *         description: Sensor data not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the sensor data was not found.
 *                 data:
 *                   type: null
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating an internal server error.
 *                 error:
 *                   type: string
 *                   description: A description of the error.
 */
Router.route("/").post(
  requestValidationMiddleware({
    body: Joi.object({
      temperature: Joi.number().required(),
      humidity: Joi.number().required(),
      pressure: Joi.number(),
      airQuality: Joi.string().valid("Good", "Moderate", "Poor"),
      location: Joi.array().items(Joi.number()),
    }),
  }),
  sensorController.createSensorData
);

Router.route("/:sensorId").put(
  requestValidationMiddleware({
    params: {
      sensorId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          "string.pattern.base": `"sensorId" should be a valid mongodb objectId`,
        }),
    },
    body: Joi.object({
      temperature: Joi.number(),
      humidity: Joi.number(),
      pressure: Joi.number(),
      airQuality: Joi.string().valid("Good", "Moderate", "Poor"),
      location: Joi.array().items(Joi.number()),
    }),
  }),
  sensorController.updateSensorData
);

Router.route("/:sensorId").delete(
  requestValidationMiddleware({
    params: {
      sensorId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          "string.pattern.base": `"sensorId" should be a valid mongodb objectId`,
        }),
    },
  }),
  sensorController.deleteSensorData
);

module.exports = Router;

/**
 * @swagger
 * definitions:
 *   createSensorDataRequestBody:
 *     type: object
 *     properties:
 *       temperature:
 *         type: number
 *         description: The temperature data.
 *         example: 30
 *       humidity:
 *         type: number
 *         description: The humidity data.
 *         example: 100
 *       pressure:
 *         type: number
 *         description: The pressure data.
 *         example: 100
 *       airQuality:
 *         type: string
 *         enum: ["Good", "Moderate", "Poor"]
 *         description: The air quality data.
 *         example: "Good"
 *       location:
 *         type: array
 *         items:
 *           type: number
 *         description: The location data
 *         example: ["10", "10", "10"]
 * 
 *   getAllSensorDataResponse:
 *     type: array
 *     items:
 *       $ref: "#/definitions/SensorData"
 *     example:
 *       - _id: "6534f9305f97ae954a85720f"
 *         temperature: 27.099157526972853
 *         humidity: 66
 *         pressure: 978
 *         airQuality: "Good"
 *         location: []
 *         timestamp: "2023-10-22T10:28:00.955Z"
 *         __v: 0
 *       - _id: "6534f93a5f97ae954a857211"
 *         temperature: 22.55850675789388
 *         humidity: 70
 *         pressure: 998
 *         airQuality: "Good"
 *         location: []
 *         timestamp: "2023-10-22T10:28:10.971Z"
 *         __v: 0
 *       - _id: "6534f9445f97ae954a857213"
 *         temperature: 28.42879472453397
 *         humidity: 25
 *         pressure: 984
 *         airQuality: "Good"
 *         location: []
 *         timestamp: "2023-10-22T10:28:20.986Z"
 *         __v: 0
 * 
 *   SensorData:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         example: "6534f9305f97ae954a85720f"
 *       temperature:
 *         type: number
 *         example: 27.099157526972853
 *       humidity:
 *         type: integer
 *         example: 66
 *       pressure:
 *         type: integer
 *         example: 978
 *       airQuality:
 *         type: string
 *         example: "Good"
 *       location:
 *         type: array
 *         items:
 *           type: number
 *         example: []
 *       timestamp:
 *         type: string
 *         format: date-time
 *         example: "2023-10-22T10:28:00.955Z"
 *       __v:
 *         type: integer
 *         example: 0
 */
