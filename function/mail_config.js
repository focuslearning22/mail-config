const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

class Mail {
    constructor() {
        this.transporter = this.createTransporter();
    }

    createTransporter() {
        return nodemailer.createTransport(
            smtpTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                tls: {
                    rejectUnauthorized: false,
                },
                auth: {
                    user: 'bharath.mindvision@gmail.com',
                    pass: 'zven qeez iwkh ohcm',  // App password here
                },
            })
        );
    }

    async send(mailOptions) {
        await this.transporter.sendMail(mailOptions);
    }
}

module.exports = Mail;
