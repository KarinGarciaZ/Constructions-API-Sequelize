const nodeMailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodeMailer.createTransport(sendGridTransport({
  auth: {
    api_key: process.env.SEND_GRID
  }
}))

module.exports = transporter;