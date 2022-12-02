import type { AppProps } from "next/app";
import { Navbar } from "../components/Navbar";
import { UsuarioProvider } from "../context/UsuarioContext";
import "../styles/index.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UsuarioProvider>
      <div>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </UsuarioProvider>
  );
}
