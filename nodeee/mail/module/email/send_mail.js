require('dotenv').config();
const nodemailer = require('nodemailer');
const emailExistence = require('email-existence');
const ejs = require('ejs');


const sender = nodemailer.createTransport({
  secure: false,
  service: process.env.SERVICE,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.SECURITY,
  },
});

const sendEmail = (req, res) => {
  const { to, subject, html, name, text } = req.body;

  ejs.renderFile(
    'views/index.ejs',
    { name, to, subject, html, text },
    (err, data) => {
      const mailOptions = {
        name,
        to,
        subject,
        text,
        html: data,
      };
      emailExistence.check(req.body.to, (error, response) => {
        if (response === true) {
          sender.sendMail(mailOptions);
          res.status(200).send({ message: 'Email sent successfully' });
        } else res.send('Email not valid');
      });
    }
  );
};

module.exports = sendEmail;
