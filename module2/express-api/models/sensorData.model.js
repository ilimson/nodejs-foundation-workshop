const mongoose = require("mongoose");

const sensorDataSchema = new mongoose.Schema(
  {
    temperature: {
      type: Number,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
    pressure: {
      type: Number,
    },
    airQuality: {
      type: String,
      enum: ["Good", "Moderate", "Poor"],
    },
    location: [Number],
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "SensorData" }
);

const SensorData = mongoose.model("SensorData", sensorDataSchema);

module.exports = SensorData;
