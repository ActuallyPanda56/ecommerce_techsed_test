"use client";

import MainFooter from "@/components/footer/MainFooter";
import * as React from "react";

interface Props {
  children: JSX.Element;
}

function PrincipalFooter({ children }: Props) {
  return (
    <>
      {children}
      <MainFooter />
    </>
  );
}

export default PrincipalFooter;
