const Router = require("express").Router({ mergeParams: true });
const { requestValidationMiddleware, Joi } = require("./../middleware");
const { sensorController } = require("./../controllers");

Router.route("/").get(sensorController.getAllSensorData);

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

module.exports = Router;
