const logger = require("../config/winston.config");
const sendGrid = require("@sendgrid/mail");
sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.sendEmail = async ({ to, subject, text }) => {
  try {
    const result = await sendGrid.send({
      from: process.env.SENDGRID_EMAIL_SENDER,
      to,
      subject,
      text,
    });

    console.log(result);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};
