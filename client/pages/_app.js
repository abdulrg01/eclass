import { store } from "../redux/store";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.PUBLIC_SOCKET_SERVER_URL || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

export default function App({ Component, pageProps }) {
  useEffect(() => {
    socketId.on("connection", () => {});
  }, []);

  return (
    <div className="bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300">
      <Provider store={store}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Component {...pageProps} />
            <Toaster position="top-center" reverseOrder={false} />
          </ThemeProvider>
        </SessionProvider>
      </Provider>
    </div>
  );
}
