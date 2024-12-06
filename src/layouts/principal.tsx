"use client";

import NavbarPrincipal from "@/components/navbar/MainNavbar";
import { Poppins } from "next/font/google";
import * as React from "react";

interface Props {
  children: JSX.Element;
  className?: string;
}

const righteous = Poppins({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});

const MemoizedChildren = React.memo(function MemoizedChildren({
  children,
}: Props) {
  return <div className="pb-0 relative">{children}</div>;
});

const MainContent = ({ children }: Props) => {
  return (
    <div className="mt-0 pb-0 min-h-[80vh] items-center flex flex-col">
      <MemoizedChildren>{children}</MemoizedChildren>
    </div>
  );
};

function PrincipalLayout({ children, className }: Props) {
  return (
    <div className={`${className} ${righteous.className} w-full`}>
      <NavbarPrincipal />
      <div className="flex items-center justify-center flex-col gap-4 w-full">
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
}

export default PrincipalLayout;
