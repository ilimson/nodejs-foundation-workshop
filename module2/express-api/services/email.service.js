const logger = require("../config/winston.config");
const sendGrid = require("@sendgrid/mail");
sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.sendEmail = async ({ to, subject, text, html }) => {
  try {
    const result = await sendGrid.send({
      from: "ilimson@stratpoint.com",
      to,
      subject,
      text,
      html,
    });

    console.log(result);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};
