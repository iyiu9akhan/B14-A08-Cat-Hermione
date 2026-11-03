"use client";

import React, { useEffect, useRef } from "react";
import Link, { useLinkStatus } from "next/link";
import { Spinner } from "./Spinner";

type ButtonLinkProps = React.ComponentProps<typeof Link> & {
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  spinnerSize?: number;
};

function ButtonLinkContent({
  children,
  icon,
  iconPosition = "left",
  spinnerSize = 18,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  spinnerSize?: number;
}) {
  const { pending } = useLinkStatus();
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (parent) {
      if (pending) {
        parent.setAttribute("aria-busy", "true");
      } else {
        parent.removeAttribute("aria-busy");
      }
    }
  }, [pending]);

  return (
    <>
      <span ref={ref} className="hidden" />
      {pending && iconPosition === "left" && <Spinner size={spinnerSize} />}
      {!pending && iconPosition === "left" && icon}
      {children}
      {pending && iconPosition === "right" && <Spinner size={spinnerSize} />}
      {!pending && iconPosition === "right" && icon}
    </>
  );
}

export function ButtonLink({
  children,
  icon,
  iconPosition = "left",
  spinnerSize = 18,
  ...props
}: ButtonLinkProps) {
  return (
    <Link {...props}>
      <ButtonLinkContent
        icon={icon}
        iconPosition={iconPosition}
        spinnerSize={spinnerSize}
      >
        {children}
      </ButtonLinkContent>
    </Link>
  );
}

