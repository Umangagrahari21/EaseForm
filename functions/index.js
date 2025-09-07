const { setGlobalOptions } = require("firebase-functions");
const { onCall } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const nodemailer = require("nodemailer");

// Limit max instances (optional)
setGlobalOptions({ maxInstances: 10 });

// Gmail credentials from Firebase config
const gmailEmail = process.env.GMAIL_EMAIL || ""; // fallback if needed
const gmailPassword = process.env.GMAIL_PASSWORD || "";

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

// Email sending function
exports.sendEmail = onCall(async (data, context) => {
  const { to, subject, text } = data;

  const mailOptions = {
    from: gmailEmail,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${to}`);
    return { success: true };
  } catch (error) {
    logger.error("Email error:", error);
    return { success: false, error: error.message };
  }
});
