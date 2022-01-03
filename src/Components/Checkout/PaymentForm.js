import React from "react";
import { Typography, Button, Divider, Grid } from "@material-ui/core";
import { Elements, CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Review from "./Review";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ checkoutToken, shippingData, prevStep, nextStep, onCaptureCheckout }) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: "card", card: cardElement });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: { firstname: shippingData.firstname, lastname: shippingData.lastname, email: shippingData.email },
        shipping: {
          name: "Primary",
          street: shippingData.adress1,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      onCaptureCheckout(checkoutToken.id, orderData);
      nextStep();
    }
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <br />
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <br />
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(event) => handleSubmit(event, elements, stripe)}>
              <CardElement />
              <br />
              <br />
              <Grid direction="row" container spacing={5}>
                <Grid item xs={12} sm={6} container justifyContent="flex-start" alignItems="flex-end">
                  <Button variant="outlined" onClick={prevStep}>
                    Back
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} container justifyContent="flex-end" alignItems="flex-start">
                  <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                    Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
