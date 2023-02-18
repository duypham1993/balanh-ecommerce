import sgMail from '@sendgrid/mail';

export const sendEmail = async (email, subject, text) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email, // Change to your recipient
    from: process.env.EMAIL, // Change to your verified sender
    subject: subject,
    text: text
  }
  await sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
} 