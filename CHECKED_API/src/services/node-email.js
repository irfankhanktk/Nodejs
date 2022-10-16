// import { google } from 'googleapis';
import { createTransport } from 'nodemailer';
// import config from './config.js';
// const oAuth2 = google.auth.OAuth2;
// const oAuth2_client = new oAuth2(config.client_id, config.client_secret);
// oAuth2_client.setCredentials({ refresh_token: config.refresh_token });




export const transporter = createTransport({
  host: 'smtp.gmail.com',
  service: 'gmail',
  auth: {
    // user: 'checkd.io9',
    // pass: 'qokcvetmclrbckza'
    user: 'irfan.khan93093@gmail.com',
    pass: 'ftyppcyqwbphkqyb'
  },
});

// var mailOptions = {
//   from: 'irfan.khan93093@gmail.com',
//   to: 'irrfankhanktk@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy !'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

// export const sendEmailToUser = (to_email, otp,callBack) => {
//   const access_token = oAuth2_client.getAccessToken();
//   const transporter = createTransport({
//     // host: 'smtp.gmail.com',
//     service: 'gmail',
//     auth: {
//       type:'OAuth2',
//       user: config.user,
//       // pass: 'tdqucmqmjjeqnmmg',
//       clientId: config.client_id,
//       clientSecret: config.client_secret,
//       refreshToken: config.refresh_token,
//       accessToken: access_token,
//     },
//   });
//   const mailOptions = {
//     from: `CHECKD <${config.user}>`,
//     to: to_email,
//     subject: 'CHECKD OTP VERIFICATION CODE',
//     html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
//     // text: 'That was easy !'
//   };
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {

//         // throw new Error(error);
//         callBack(error,null)
//         return;
//     }
//     console.log('Message sent: %s', info.messageId);
//     callBack(null,info)
// });
// }