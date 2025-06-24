const nodemailer = require("nodemailer");

/**
 * Sends an email using the configured SMTP settings from environment variables
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text email body
 * @param {string} options.html - HTML email body (optional)
 * @returns {Promise} - Resolves with info about the sent email or rejects with error
 */
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_ENCRYPTION === "ssl",
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Set up email data
    const mailOptions = {
      from: `Sarajevo Expats <${process.env.SMTP_USERNAME}>`,
      to,
      subject,
      text,
      html: html || text,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

/**
 * Sends a notification email to the admin about a new trip application
 * @param {Object} tripApplication - The trip application data
 * @param {Object} trip - The trip data
 * @returns {Promise} - Resolves with info about the sent email or rejects with error
 */
const sendTripApplicationNotification = async (tripApplication, trip) => {
  const subject = `New Trip Application: ${trip.title}`;

  const text = `
    New Trip Application Received
    
    Trip: ${trip.title}
    Date: ${tripApplication.selectedDate}
    
    Applicant Details:
    Name: ${tripApplication.name}
    Email: ${tripApplication.email}
    Phone: ${tripApplication.phone}
    
    Application received on: ${new Date(
      tripApplication.createdAt
    ).toLocaleString()}
  `;

  const html = `
    <h2>New Trip Application Received</h2>
    
    <p><strong>Trip:</strong> ${trip.title}</p>
    <p><strong>Date:</strong> ${tripApplication.selectedDate}</p>
    
    <h3>Applicant Details:</h3>
    <p><strong>Name:</strong> ${tripApplication.name}</p>
    <p><strong>Email:</strong> ${tripApplication.email}</p>
    <p><strong>Phone:</strong> ${tripApplication.phone}</p>
    
    <p><em>Application received on: ${new Date(
      tripApplication.createdAt
    ).toLocaleString()}</em></p>
  `;

  const adminEmail = process.env.EMAIL_TO || "ibrahemmohamedb@gmail.com";

  return sendEmail({
    to: adminEmail,
    subject,
    text,
    html,
  });
};

module.exports = {
  sendEmail,
  sendTripApplicationNotification,
};
