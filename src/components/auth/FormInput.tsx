"use client";

import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

type Props = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

const FormInput = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}: Props) => {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-textFont text-[14px] font-semibold text-white"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={isPassword && show ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-2xl bg-white/25 py-4 pl-5 font-textFont text-[15px] font-medium text-white outline-none placeholder:text-white/70 focus:bg-white/35 ${
            isPassword ? "pr-14" : "pr-5"
          } ${error ? "ring-2 ring-white" : ""}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-white"
          >
            {show ? <BsEyeSlash size={18} /> : <BsEye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-2 w-fit rounded-lg bg-white px-3 py-1 font-textFont text-[12px] font-semibold text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;