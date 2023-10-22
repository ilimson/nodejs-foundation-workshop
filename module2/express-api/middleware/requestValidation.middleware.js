const { celebrate } = require("celebrate");

module.exports = (joiSchema) => {
  const config = {
    abortEarly: false,
    convert: true,
    allowUnknown: true,
  };

  return celebrate(joiSchema, config);
};
