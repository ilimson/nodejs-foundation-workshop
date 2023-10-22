const express = require("express");
// const rTracer = require("cls-rtracer");
const helmet = require("helmet");
const cors = require("cors");

module.exports = () => [
  cors(),
  helmet(),
  // rTracer.expressMiddleware(),
  express.json(),
  express.urlencoded({ extended: false }),
];
