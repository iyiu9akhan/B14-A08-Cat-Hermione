"use client";
import type { ComponentProps } from "react";
import Link from "next/link";
import { useAuthTransition } from "./AuthTransition";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  direction: "left" | "right";
};

export default function TransitionLink({
  href,
  direction,
  onClick,
  children,
  ...props
}: Props) {
  const go = useAuthTransition();

  return (
    <Link
      href={href}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (!go || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        go(href, direction);
      }}
    >
      {children}
    </Link>
  );
}
