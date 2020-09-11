require('dotenv').config();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendErrorEmail = async (subject, text) => {
  try {
    const msg = {
      to: 'sportshubla@gmail.com',
      from: 'sportshubla@gmail.com',
      subject,
      text: JSON.stringify(text)
    };

    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};

module.exports = {
  sendErrorEmail
};
