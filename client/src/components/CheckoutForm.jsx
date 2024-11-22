import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { saveOrder } from "../api/user";
import useEcomStore from "../stores/ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const token = useEcomStore((state) => state.token);
  const clearCart =useEcomStore((state) => state.actionClearCart)

  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const payload = await stripe.confirmPayment({
      elements,
      //   confirmParams: {
      //     // Make sure to change this to your payment completion page
      //     return_url: "http://localhost:3000/complete",
      //   },
      redirect: "if_required",
    });
    console.log(payload);

    setIsLoading(false);

    console.log("payload : ", payload);

    if (payload.error) {
      setMessage(payload.error.message || "An unexpected error occurred.");
      console.log("error");
      toast.error(payload.error.message || "An unexpected error occurred.");
      //ชำระเงินสำเร็จ
    } else if (payload.paymentIntent.status === "succeeded") {
      console.log("Ready or saveover");
      //create order
      saveOrder(token, payload)
        .then((res) => {
          console.log(res);
          clearCart()   //clear cart in header
          toast.success("payment success...");
          navigate("/user/history");
        })
        .catch((err) => {
          console.log(err);
        });

      //   setMessage("Payment successful!",payload);
    } else {
      console.log("payment failed");
      toast.warning("Payment failed");

      //   setMessage("Payment successful!",payload);
    }
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Complete Your Payment
        </h2>
        <PaymentElement id="payment-element" options={paymentElementOptions} />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={isLoading || !stripe || !elements}
          startIcon={isLoading && <CircularProgress size={20} />}
          className="mt-4"
        >
          {isLoading ? "Processing..." : "Pay Now"}
        </Button>

        {message && (
          <div
            id="payment-message"
            className={`p-3 mt-4 text-center rounded-md ${
              message.includes("successful")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
