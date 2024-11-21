const express = require('express');
const router = express.Router();
const Mail = require('../services/mailService');

// Example route for sending email
router.post('/', async (req, res) => {
    const { to, subject, text, html } = req.body;

    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    console.log("body ---->", req.body);
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

    const mail = new Mail();

    const mailOptions = {
        from: 'bharath.mindvision@gmail.com',  // Sender address
        to,                                   // Recipient address
        subject,                              // Subject line
        text,                                 // Plain text body
        html,                                 // HTML body (optional)
    };

    try {
        await mail.send(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

module.exports = router;
