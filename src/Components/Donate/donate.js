import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import stripe from '../../config';
import axios from 'axios';

class Donate extends Component {

  onToken = async(token) => {
    token.card = void 0;

    await axios.post('/api/payment', {token, amount: 100})
          .then(() => {
            alert('Payment Submitted')
          })
          .catch(err => console.log(err))
  }

  render(){
    return (
      <div className="App">
        <StripeCheckout 
          label='Donate $1'
          token={this.onToken}
          stripeKey={stripe.public_key}
          amount={100}
          // shippingAddress={true}
          // billingAddress={true}
          />
      </div>
    );
  }
}

export default Donate;