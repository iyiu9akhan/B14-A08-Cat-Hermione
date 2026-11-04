"use client";

import React, { useState, useTransition } from "react";
// import Link from "next/link";
import TransitionLink from "@/components/auth/TransitionLink";
import toast from "react-hot-toast";
import { BsPersonPlus, BsCheckLg, BsXLg } from "react-icons/bs";
import AuthLayout from "@/components/auth/AuthLayout";
import FormInput from "@/components/auth/FormInput";
import { Spinner } from "@/components/ui/Spinner";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface RegisterFormData {
  name: string;
  email: string;
  photoURL: string;
  password: string;
}

type Errors = {
  name?: string;
  email?: string;
  photoURL?: string;
  password?: string;
};

const passwordRules = [
  {
    label: "At least one uppercase letter (A-Z)",
    test: (v: string) => /[A-Z]/.test(v),
  },
  {
    label: "At least one lowercase letter (a-z)",
    test: (v: string) => /[a-z]/.test(v),
  },
  { label: "Minimum 6 characters length", test: (v: string) => v.length >= 6 },
];

const RegistrationPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isBusy = isLoading || isPending;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isBusy) return;

    const newErrors: Errors = {};

    if (!name.trim()) newErrors.name = "Name is required.";

    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = "Please enter a valid email address.";

    if (photoURL.trim() && !/^https?:\/\/\S+$/.test(photoURL))
      newErrors.photoURL = "Please enter a valid URL (http or https).";

    if (!password) newErrors.password = "Password is required.";
    else if (!/[A-Z]/.test(password))
      newErrors.password = "Password must have an uppercase letter.";
    else if (!/[a-z]/.test(password))
      newErrors.password = "Password must have a lowercase letter.";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters long.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error(Object.values(newErrors)[0] as string);
      return;
    }

    const data: RegisterFormData = {
      name: name.trim(),
      email: email.trim(),
      photoURL: photoURL.trim(),
      password,
    };

    setIsLoading(true);

    try {
      const { data: result, error } = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        image: data.photoURL || undefined,
      });

      if (error) {
        setIsLoading(false);
        toast.error(error.message || "Failed to create account.");
        return;
      }

      console.log(result);
      console.log("Token:", result?.token);

      toast.success("Account created successfully!");
      startTransition(() => {
        router.push("/");
        router.refresh();
      });
    } catch {
      setIsLoading(false);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col justify-center lg:min-h-195">
        <h1 className="font-headingFont text-[43px] leading-tight text-white">
          Register an account
        </h1>
        <p className="mt-2 mb-8 font-textFont text-[15px] font-medium text-white/90">
          Create an account to organize events and help people in need.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <FormInput
            label="Name"
            name="name"
            placeholder="Enter your full name"
            value={name}
            onChange={setName}
            error={errors.name}
          />
          <FormInput
            label="Email address"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={setEmail}
            error={errors.email}
          />

          <div>
            <FormInput
              label="Photo URL"
              name="photoURL"
              type="url"
              placeholder="https://example.com/photo.jpg"
              value={photoURL}
              onChange={setPhotoURL}
              error={errors.photoURL}
            />
            {!errors.photoURL && (
              <p className="mt-2 font-textFont text-[13px] text-white/70">
                Optional: Leave empty for default avatar
              </p>
            )}
          </div>

          <div>
            <FormInput
              label="Password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={setPassword}
              error={errors.password}
            />
            <ul className="mt-3 space-y-1.5">
              {passwordRules.map((rule) => {
                const isValid = rule.test(password);
                return (
                  <li
                    key={rule.label}
                    className={`flex items-center gap-2 font-textFont text-[13px] transition-colors duration-300 ${
                      isValid ? "text-green-300" : "text-white/70"
                    }`}
                  >
                    {isValid ? <BsCheckLg size={12} /> : <BsXLg size={11} />}
                    {rule.label}
                  </li>
                );
              })}
            </ul>
          </div>

          <button
            type="submit"
            disabled={isBusy}
            aria-busy={isBusy}
            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-white px-7 py-3.5 font-textFont text-[15px] font-bold text-gray-900 transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
          >
            {isBusy ? (
              <Spinner size={18} className="text-gray-900" />
            ) : (
              <BsPersonPlus size={18} />
            )}
            {isBusy ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-8 text-center font-textFont text-[14px] font-medium text-white/90">
          Already have an account?{" "}
          <TransitionLink
            href="/login"
            direction="right"
            className="font-medium text-white font-textFont underline underline-offset-4 text-[16px]"
          >
            Login
          </TransitionLink>
        </p>
      </div>
    </AuthLayout>
  );
};

export default RegistrationPage;
