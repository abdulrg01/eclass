import Persist from "./Auth/Persist";
import Header from "./component/Header";

// - Applies to all routes
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        <Persist>{children}</Persist>
      </body>
    </html>
  );
}
