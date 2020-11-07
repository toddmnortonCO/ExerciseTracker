require('dotenv').config();
const nodemailer = require('nodemailer'),
      { GMAIL_USER, GMAIL_PASS } = process.env;


module.exports = {
    email:  (req, res) => {
        const { userEmail} = req.body;
        // const db = req.app.get('db');
        console.log(req.body)
        // try/catch is used to handle errors without the use of .then and .catch
        try {
            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: {GMAIL_USER},
                    pass: {GMAIL_PASS}
                },
            });

            let info = transporter.sendMail({
                from: `Todd Norton <${GMAIL_USER}>`,
                // add new user registration email address
                to: this.userEmail,
                // db.exercise_tracker_users.email,
                subject: 'Time to Get Swoll!',
                text: 'This is a NodeMailer test message',
 
            }, (err, res) => {
                if(err){
                    console.log(err, 'Error occured')
                } else {
                    res.status(200).send(info, 'Email sent!');
                }
            })
        } catch(err){
            res.status(500).send(err);
        }
    } 
}