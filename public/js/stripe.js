import axios from 'axios';
import { showAlert } from './alert';

const stripe = Stripe(
  'pk_test_51OFXGTJ7tZo3Kw6FYC89xAVNVDQpPLGKmzcZSkNPRirT74c6iuvuWZT1hpSawU0CogQvOCQpy0IiqabQemwtcISg00D7UetnQn',
);

export const bookTour = async (tourID) => {
  try {
    //1. Get Checkout sessiom from api
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourID}`,
    );
    console.log(session);

    //2.Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};
