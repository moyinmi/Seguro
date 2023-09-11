//const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: process.env.EMAIL_USERNAME,
//     pass: process.env.EMAIL_PASSWORD,
//   },
//   port: 587
  
// });

// module.exports = transporter;


// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USERNAME,
//     pass: process.env.EMAIL_PASSWORD,
//   },
//   port: process.env.EMAIL_PORT,
// });

// transporter.verify((error, success) => {
//   if (error) {
//     console.error('Email transport verification error:', error);
//   } else {
//     console.log('Email transport is ready to send messages');
//   }
// });

// module.exports = transporter;


 const nodemailer = require('nodemailer');

 const sendEmail = async options => {
   // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  //2) Define the email options
  const mailOptions = {
    from: 'Seguro <hello@seguro.io>',
     to: options.email,
     subject: options.subject,
     text: options.message,
    html: options.html,
   };

   // 3) Actually send the email
   await transporter.sendMail(mailOptions);
 };
 
module.exports = sendEmail;
