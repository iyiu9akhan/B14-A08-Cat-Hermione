"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { BsBoxArrowInRight, BsGoogle } from "react-icons/bs";
import AuthLayout from "@/components/auth/AuthLayout";
import FormInput from "@/components/auth/FormInput";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = "Please enter a valid email address.";

    if (!password) newErrors.password = "Password is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors and try again.");
      return;
    }

    toast.success("Logged in successfully!");
  };

  const handleGoogle = () => {
    toast.success("Logged in with Google!");
  };

  return (
    <AuthLayout>
      <h1 className="font-headingFont text-[48px] leading-tight text-white">
        Login
      </h1>
      <p className="mt-2 mb-8 font-textFont text-[15px] font-medium text-white/90">
        Welcome back. Log in to join and manage donation events.
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormInput
          label="Email address"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={setEmail}
          error={errors.email}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={setPassword}
          error={errors.password}
        />

        {/* <div className="text-right">
          <Link
            href="#"
            className="font-textFont text-[13px] font-semibold text-white underline underline-offset-4"
          >
            Forgot password?
          </Link>
        </div> */}

        <button
          type="submit"
          className="mt-5 shadow-sm inline-flex w-full cursor-pointer items-center justify-center  rounded-full bg-white px-4 py-2 font-textFont text-[15px] font-bold text-gray-900 transition-transform duration-300 hover:scale-105"
        >
          <span className="flex size-10 items-center justify-center rounded-full text-black">
            <BsBoxArrowInRight size={19} />
          </span>
          Login
        </button>
      </form>

      <div className="my-6 flex items-center gap-3 font-textFont text-[13px] font-semibold text-white/90">
        <span className="h-px flex-1 bg-white/40" />
        or
        <span className="h-px flex-1 bg-white/40" />
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        className="shadow-sm flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-white/60 bg-transparent py-3 font-textFont text-[15px] font-bold text-white  hover:bg-white hover:text-black transition-all  duration-300 hover:scale-105"
      >
        <BsGoogle size={16} />
        Continue with Google
      </button>

      <p className="mt-8 font-textFont text-[14px] text-center font-medium text-white/90">
        Don&apos;t have an account?{" "}
        <Link
          href="/registration"
          className="font-bold text-white underline underline-offset-4"
        >
          Register now
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
