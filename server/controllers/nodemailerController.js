const nodemailer = require('nodemailer'),
      { GMAIL_USER, GMAIL_PASS } = process.env;


module.exports = {
    
    email: async(req, res) => {
        // const db = req.app.get('db');
        console.log(req.body)
        // try/catch is used to handle errors without the use of .then and .catch
        try {
            //The transporter is essentially the email that you are using to send
            //emails to your users. This is done using NodeMailers createTransport
            //method, passing it an object containing the information needed to 
            //sign into the email.
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                auth: {
                    user: {GMAIL_USER},
                    password: {GMAIL_PASS}
                },
                port: 587,
                service: 'gmail',
                secure: false,
                requireTLS: true
            });

            //info gets defined the result of the sendMail method. This method is 
            //attached to your transporter upon its creation. sendMail needs to be
            //passed an object that contains information about the email itself, 
            //meaning the from and to categories, the subject, and the body of the
            //email.
            let info = await transporter.sendMail({
                from: `Todd Norton <${GMAIL_USER}>`,
                // add new user registration email address
                to: 'toddmnorton@live.com',
                // db.exercise_tracker_users.email,
                subject: 'Time to Get Swoll!',
                text: 'This is a NodeMailer test message',
                //html contains the body of your email, and can use html tags to
                //structure it, and inline styling to style it. IF you are using an
                //image, you should pass the src that is provided below, and then
                //give the actual image  value in the attachments array below.
            
                //attachments include files attached to the email, as well as sources
                //for your images.
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