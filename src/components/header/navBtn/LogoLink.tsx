"use client";

import React from "react";
import Link from "next/link";

const LogoLink = ({ children }: { children: React.ReactNode }) => {
  return (
    <Link
      href="/"
      scroll={false}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
    >
      {children}
    </Link>
  );
};

export default LogoLink;