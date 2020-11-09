const {SECRET_KEY} = process.env,
      stripe = require('stripe')(SECRET_KEY);

module.exports = {
    completePayment: (req, res) => {
        const {token, amount} = req.body;

        const charge = stripe.charges.create({
            amount: 100,
            currency: 'usd',
            source: token.id,
            description: 'Test Charge'
        }, function(err, charge){
            if(err){
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        })
    }
}
