const nodemailer = require("nodemailer");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = {
    // nodemailer - POST route from contact form
    emailPost: ("/contact", (req, res) => {
        // Instantiate the SMTP server
        const smtpTrans = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: GMAIL_USER,
                pass: GMAIL_PASSWORD,
            },
        });

        // Specify what the email will look like
        const mailOpts = {
            from: "Your sender info here", // This is ignored by Gmail
            to: GMAIL_USER,
            subject: "New Get Swoll Exercise Tracker Message",
            text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`,
        };

        // Attempt to send the email
        smtpTrans.sendMail(mailOpts, (error, response) => {
            if (error) {
                res.render("contact-failure"); // Show a page indicating failure
            } else {
                res.render("contact-success"); // Show a page indicating success
            }
        });
    })
}
