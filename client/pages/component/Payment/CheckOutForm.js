import {
  LinkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useCreateOrderMutation } from "../../../redux/orders/ordersApi";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import socketIO from "socket.io-client";
import Loader from "../Loader";
const ENDPOINT = process.env.PUBLIC_SOCKET_SERVER_URL || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

export default function CheckOutForm({ data, user }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      if ("data" in error) {
        const errorMessage = error;
        toast.error(errorMessage.data.message);
      }
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsLoading(false);
      createOrder({ courseId: data._id, payment_info: paymentIntent });
    }
  };

  useEffect(() => {
    if (orderData) {
      setIsLoading(true);
      socketId.emit("notification", {
        title: "New Order",
        message: `You have a new order from ${data.name}`,
        userId: user._id,
      });
      router.push(`/courseAccess/${data._id}`);
    }

    if (error) {
      if ("data" in error) {
        const errorMessage = error;
        toast.error(errorMessage.data.message);
      }
    }
  }, [orderData, error]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <form id="payment-form" onSubmit={handleSubmit}>
          <LinkAuthenticationElement id="link-authentication-element" />
          <PaymentElement id="payment-element" />
          <button
            className="mt-5 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex flex-row justify-center items-center py-3 px-6 cursor-pointer bg-[#2190ff] min-h-[45px] w-full text-[16px] font-Poppins font-semibold h-[35px]"
            disabled={isLoading || !stripe || !elements}
            id="submit"
          >
            <span id="button-text">{isLoading ? "Paying..." : "Pay now"}</span>
          </button>
          {message && <div id="payment-message">{message}</div>}
        </form>
      )}
    </>
  );
}
