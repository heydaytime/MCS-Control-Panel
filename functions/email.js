import nodemailer from "nodemailer";

const { CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN, REFRESH_TOKEN } = process.env;

async function sendEmail({ to, subject, text, html }) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "noreply.heydaytime@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        accessToken: ACCESS_TOKEN,
        refreshToken: REFRESH_TOKEN,
      },
    });

    const mailOptions = {
      from: "noreply.heydaytime@gmail.com",
      to,
      subject,
      text,
      html,
    };

    const result = await transporter.sendMail(mailOptions);

    return result;
  } catch (err) {}
}

const emailer = {
  verification: (to, verificationCode) => {
    const subject = "HeyDayTime Account Verification Code";
    const html = `<h1 style="">Verification Code: ${verificationCode}</h1> <p>This OTP lasts for 10 minutes after generated!</p>`;
    const mail = {
      to,
      subject,
      html,
      text: verificationCode,
    };
    sendEmail(mail);
  },
};

export default emailer;
