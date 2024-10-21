const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    const { feedback } = JSON.parse(event.body);

    // Create a Nodemailer transporter using your email service (e.g., Gmail, SMTP)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        port: 465,
        auth: {
            user: process.env.EMAIL_USER, // Use environment variables for security
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: 'saishinkarwebsite@example.com', // List of recipients
        subject: 'New Feedback Received',
        text: `Feedback: ${feedback}`,
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'Email sent successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: error.message }),
        };
    }
};
