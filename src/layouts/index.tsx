import { useRouter } from "next/router";
import React from "react";
import { staticLayoutsMap, dynamicLayoutsRules } from "./layouts-map";
import PrincipalLayout from "./principal";

interface Props {
  children: JSX.Element;
}

const LayoutWrapper = ({ children }: Props) => {
  const router = useRouter();
  const pathname = router.pathname;

  // Check for static layouts first
  const StaticLayout = staticLayoutsMap[pathname];

  // If no static layout, check for dynamic layouts
  const dynamicLayoutRule = dynamicLayoutsRules.find((rule) =>
    rule.pattern.test(pathname)
  );

  // Select the layout based on static or dynamic rule
  const Layout = StaticLayout || dynamicLayoutRule?.layout || PrincipalLayout;

  return <Layout>{children}</Layout>;
};

export default LayoutWrapper;
