import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { payment } from "../../api/stripe";
import useEcomStore from "../../stores/ecom-store";
import CheckoutForm from "../../components/CheckoutForm";

// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51QHzhVGHdw6djxlBOC9ZpcKBeX03MBR9nJEI2I4puL7OihtXoeP2bRO50QRLDcY3uXI2hqi3px7orb8jGsDlMQKK00MqGrM7MJ"
);

const Payment = () => {
  const token = useEcomStore((state) => state.token);
  const [clientSecret, setClientSecret] = useState("");

  console.log(clientSecret);

  useEffect(() => {
    payment(token)
    .then((res)=> {
      console.log(res);
      setClientSecret(res.data.clientSecret)
    })
    .catch((err)=>{
      console.log(err);
      
    })
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto';

  return (
    <div>
      {
        clientSecret &&  (
          <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
            <CheckoutForm/>
          </Elements>
        )
      }
    </div>
  )
};

export default Payment;
