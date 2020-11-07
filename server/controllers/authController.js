const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer'),
      { GMAIL_USER, GMAIL_PASS } = process.env;

module.exports = {
    email: async(req, res) => {
        // const db = req.app.get('db');
        console.log(req.body)
        // try/catch is used to handle errors without the use of .then and .catch
        try {
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

            let info = await transporter.sendMail({
                from: `Todd Norton <${GMAIL_USER}>`,
                // add new user registration email address
                to: 'toddmnorton@live.com',
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
    },
    register: async (req, res) => {
        const { email, password } = req.body,
            db = req.app.get('db');
        
        const foundUser = await db.users.check_user({ email });
        if (foundUser[0]) {
            return res.status(400).send('Email already in use')
        }

        let salt = bcrypt.genSaltSync(10),
            hash = bcrypt.hashSync(password, salt);
        
        const newUser = await db.users.register_user({ email, hash });
            console.log(newUser)

                // SECOND AWAIT TO INITIALIZE NEW REGISTERED USER EMAIL
        req.session.user = newUser[0];
        res.status(201).send(req.session.user);
    },
    login: async (req, res) => {
        const { email, password } = req.body,
            db = req.app.get('db');
        
        const foundUser = await db.users.check_user({ email });
        if (!foundUser[0]) {
            return res.status(404).send('Email not found')
        }

        const authenticatedUser = bcrypt.compareSync(password, foundUser[0].password)
        if (!authenticatedUser) {
            return res.status(401).send('Email or password is incorrect')
        }

        delete foundUser[0].password;
        req.session.user = foundUser[0];
        res.status(202).send(req.session.user);
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
    
}