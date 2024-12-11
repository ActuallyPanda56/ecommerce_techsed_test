import { useRouter } from "next/router";
import React from "react";
import PrincipalFooter from "./principal";
import { staticFootersMap, dynamicFootersRules } from "./footers-map";

interface Props {
  children: JSX.Element;
}

const FooterWrapper = ({ children }: Props) => {
  const router = useRouter();
  const pathname = router.pathname;

  const staticFooter = staticFootersMap[pathname] || PrincipalFooter;
  const dynamicFooterRule = dynamicFootersRules.find((rule) =>
    rule.pattern.test(pathname)
  );

  const Footer = staticFooter || dynamicFooterRule?.footer || PrincipalFooter;

  return <Footer>{children}</Footer>;
};

export default FooterWrapper;
