import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}
function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`max-w-7xl mx-auto w-full px-4 sm:px-6 xl:px-0 ${className}`}>{children}</div>
  );
}

export default Container;
