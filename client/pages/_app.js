import { store } from "../redux/store";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import socketIO from "socket.io-client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const ENDPOINT = process.env.PUBLIC_SOCKET_SERVER_URL || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

export default function App({ Component, pageProps }) {
  const stripePromise = loadStripe('your_stripe_public_key');

  useEffect(() => {
    socketId.on("connection", () => {});
  }, []);

  return (
    <div className="bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300">
      <Provider store={store}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Elements stripe={stripePromise}>
            <Component {...pageProps} />
            </Elements>
            <Toaster position="top-center" reverseOrder={false} />
          </ThemeProvider>
        </SessionProvider>
      </Provider>
    </div>
  );
}
