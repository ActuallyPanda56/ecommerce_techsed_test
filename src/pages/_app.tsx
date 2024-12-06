import "@/styles/globals.css";
import type { AppProps } from "next/app";

import FooterWrapper from "@/footers";
import LayoutWrapper from "@/layouts";
import CartPopup from "@/components/CartPopup";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LayoutWrapper>
      <FooterWrapper>
        <>
          <Component {...{ ...pageProps }} />
          <CartPopup />
        </>
      </FooterWrapper>
    </LayoutWrapper>
  );
}
