import React from "react";

export const inputClass = (hasError?: boolean, withIcon = true) =>
  `w-full rounded-xl border bg-background py-3 pr-4 font-textFont text-[15px] text-headingColor shadow-sm outline-none transition placeholder:text-bodyText/60 focus:ring-2 ${
    withIcon ? "pl-11" : "pl-4"
  } ${
    hasError
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
      : "border-borderSoft focus:border-brand focus:ring-brand/20"
  }`;

type FormFieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: React.ReactNode;
  children: React.ReactNode;
};

const FormField = ({
  label,
  htmlFor,
  error,
  hint,
  children,
}: FormFieldProps) => {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block font-textFont text-[14px] font-bold text-headingColor"
      >
        {label} <span className="text-red-500">*</span>
      </label>
      {children}
      {error ? (
        <p className="mt-2 font-textFont text-[13px] font-medium text-red-500">
          {error}
        </p>
      ) : (
        hint && (
          <div className="mt-2 font-textFont text-[13px] text-bodyText">
            {hint}
          </div>
        )
      )}
    </div>
  );
};

export default FormField;