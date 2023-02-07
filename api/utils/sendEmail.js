import nodemailer from "nodemailer";
import { OAuth2Client } from 'google-auth-library';

export const sendEmail = async (email, subject, text) => {
  try {
    const myOAuth2Client = new OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET);

    myOAuth2Client.setCredentials({
      refresh_token: process.env.OAUTH_RT
    });

    const accessTokenObject = await myOAuth2Client.getAccessToken();
    const accessToken = accessTokenObject?.token;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refresh_token: process.env.OAUTH_RT,
        accessToken: accessToken
      }
    });

    await transporter.sendMail({
      to: email,
      subject: subject,
      text: text
    })
    console.log("send email success")
  } catch (error) {
    console.log(error)
  }
} 