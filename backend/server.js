const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allows your frontend to talk to this backend
app.use(express.json()); // Parses incoming JSON payloads

// Setup Mail Transporter (using Gmail configuration as an example)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify mail configuration on startup
transporter.verify((error, success) => {
    if (error) {
        console.error('Mail server configuration error:', error);
    } else {
        console.log('Mail server is ready to send messages');
    }
});

// Contact Route
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Quick structural validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Email layout configuration
    const mailOptions = {
        from: process.env.EMAIL_USER, 
        to: process.env.RECEIVER_EMAIL, 
        subject: `New Portfolio Message from ${name}`,
        text: `You received a message from your portfolio website:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        replyTo: email // Allows you to hit 'Reply' directly to the user's email
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send message. Please try again later.' });
        }
        console.log('Email sent:', info.response);
        return res.status(200).json({ message: 'Message sent successfully!' });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running smoothly on port ${PORT}`);
});