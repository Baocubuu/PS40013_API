const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'quocanhjaki@gmail.com',
      pass: 'vtwlxqlvnhcmhyur'
    }
  });

module.exports = { transporter };
