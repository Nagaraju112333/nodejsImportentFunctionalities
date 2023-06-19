const nodemailer = require("nodemailer");
const logger = require("../loaders/logger");
const CONFIG = require("./dotenv");
//const { ServiceBusClient } = require("@azure/service-bus");
//const azureNotificationModel = require("../models/azureNotifications");

if (
    process.env.EMAIL_USRNAME == undefined ||
    process.env.EMAIL_USRNAME == "" ||
    CONFIG.EMAIL_USRNAME == undefined ||
    CONFIG.EMAIL_USRNAME == ""
  ) {
    console.log(process.env.EMAIL_USRNAME,"--------------------------")
    logger.error("Email UserName not found in environment");
    process.exit(1);
} else if (process.env.EMAIL_CLIENTID == undefined) {
  logger.error("Email Client ID not found in environment");
  process.exit(1);
} else if (process.env.EMAIL_SECRET == undefined) {
  logger.error("Email secret is not found in environment");
  process.exit(1);
} else if (process.env.EMAIL_REFRESH_TOKEN == undefined) {
  logger.error("Email refresh token not found in environment");
  process.exit(1);
} else if (process.env.EMAIL_ACCESS_TOKEN == undefined) {
  logger.error("Email Access token not found in environment");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USRNAME,
      clientId: process.env.EMAIL_CLIENTID,
      clientSecret: process.env.EMAIL_SECRET,
      refreshToken: process.env.EMAIL_REFRESH_TOKEN,
      accessToken: process.env.EMAIL_ACCESS_TOKEN,
    },
  });

async function sendEmail(email, firstName, lastName) {
    console.log(email,"send email fun")
    try {
      console.log(email,"try emailid");
      return await transporter.sendMail({
        from: process.env.EMAIL_USRNAME,
        to: email,
        subject: "Approval confirmation Mail",
        text:
          "Hi " +
          firstName +
          " " +
          lastName +
          ", Your Tele-Medicine appointment is booked successfully on " 
      });
      
    
    } catch (err) {
      logger.error("Error: " + err);
      throw err;
    }
  }
  exports.emailService={
    sendEmail:sendEmail
  }