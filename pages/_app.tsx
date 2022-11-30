import type { AppProps } from "next/app";
import { Navbar } from "../components/Navbar";
import "../styles/index.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}
