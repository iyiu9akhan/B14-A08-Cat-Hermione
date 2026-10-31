"use client";

import React, { useState } from "react";
import Container from "../container/Container";
import { BsChevronDown, BsEnvelope, BsSend } from "react-icons/bs";


const topics = ["All updates", "Upcoming events", "Impact stories"];

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [topic, setTopic] = useState(topics[0]);
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!email) return;
    setSent(true);
  };

  return (
    <section className="bg-background py-20">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 rounded-3xl border border-borderSoft bg-gradient-color p-8 md:p-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 py-1 pl-1 pr-4 font-textFont text-[13px] font-semibold text-brand">
              <span className="flex size-7 items-center justify-center rounded-full bg-headingColor text-background">
                <BsEnvelope size={13} />
              </span>
              Newsletter
            </span>

            <h2 className="mt-5 font-headingFont text-[48px] leading-tight text-headingColor">
              Stay Connected With Every Act of Kindness
            </h2>

            <p className="mt-4 max-w-130 font-textFont text-[18px] font-medium text-bodyText opacity-80">
              Subscribe to receive upcoming donation events, volunteer
              opportunities and stories from the communities we serve. One email
              a month, no spam, and you can unsubscribe anytime.
            </p>
          </div>

          <div className="rounded-3xl bg-brand p-6 md:p-8">
            {sent ? (
              <div className="py-10 text-center text-white">
                <h3 className="font-headingFont text-[32px]">Thank you!</h3>
                <p className="mt-2 font-textFont text-[16px] font-medium">
                  You are now subscribed. Please check your inbox for a
                  confirmation email.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block font-textFont text-[14px] font-semibold text-white">
                    Your name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full rounded-2xl bg-white/25 px-5 py-4 font-textFont text-[15px] font-medium text-white placeholder:text-white/70 outline-none focus:bg-white/35"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-textFont text-[14px] font-semibold text-white">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-2xl bg-white/25 px-5 py-4 font-textFont text-[15px] font-medium text-white placeholder:text-white/70 outline-none focus:bg-white/35"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-textFont text-[14px] font-semibold text-white">
                    I want to hear about
                  </label>
                  <div className="relative">
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      style={{ appearance: "none", WebkitAppearance: "none" }}
                      className="w-full cursor-pointer rounded-2xl bg-white/25 py-4 pl-5 pr-14 font-textFont text-[15px] font-medium text-white outline-none focus:bg-white/35"
                    >
                      {topics.map((t) => (
                        <option key={t} value={t} className="text-gray-800">
                          {t}
                        </option>
                      ))}
                    </select>
                    <BsChevronDown
                      size={14}
                      className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-white"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex cursor-pointer items-center gap-3 rounded-full bg-white py-2 pl-2 pr-6 font-textFont text-[15px] font-bold text-gray-900 transition-transform duration-300 hover:scale-105"
                >
                  <span className="flex size-10 items-center justify-center rounded-full bg-gray-900 text-white">
                    <BsSend size={15} />
                  </span>
                  Subscribe
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Newsletter;
