import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function Spinner({
  size = 18,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <AiOutlineLoading3Quarters
      size={size}
      className={`animate-spin text-current shrink-0 ${className}`}
    />
  );
}

