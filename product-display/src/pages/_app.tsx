import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ThemeToggle from "@/components/Theamtoggel";

export default function App({ Component, pageProps }: AppProps) {
  <ThemeToggle/>
  return <Component {...pageProps} />;
}
