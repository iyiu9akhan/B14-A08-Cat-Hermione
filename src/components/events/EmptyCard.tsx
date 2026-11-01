import React from "react";

type EmptyCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
};

const EmptyCard = ({ icon, title, description, children }: EmptyCardProps) => (
  <div className="flex flex-col items-center rounded-3xl border border-dashed border-borderSoft bg-background/50 px-6 py-16 text-center sm:py-20">
    <span className="flex size-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
      {icon}
    </span>
    <h3 className="mt-6 font-headingFont text-[26px] font-medium text-headingColor">
      {title}
    </h3>
    <p className="mt-2 max-w-md font-textFont text-[15px] text-bodyText">
      {description}
    </p>
    {children && <div className="mt-7">{children}</div>}
  </div>
);

export default EmptyCard;