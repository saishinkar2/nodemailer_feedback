const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ success: false, message: 'Method Not Allowed' }),
        };
    }

    // Parse the feedback from the request body
    const { feedback } = JSON.parse(event.body);

    EMAIL_USER: "sshinkar83@gmail.com"
    EMAIL_PASS: "anvjsgpxyretvtfa"

    // Set up Nodemailer transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true, // Use SSL
        port: 465,
        auth: {
            user: process.env.EMAIL_USER, // Environment variable for sender email
            pass: process.env.EMAIL_PASS, // Environment variable for email password
        },
    });

    // Configure email details
    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: 'saishinkarwebsite@example.com', // Recipient email address
        subject: 'New Feedback Received',
        text: `Feedback: ${feedback}`,
    };

    try {
        // Send the email using Nodemailer
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'Email sent successfully' }),
        };
    } catch (error) {
        // Handle any errors
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: error.message }),
        };
    }
};
