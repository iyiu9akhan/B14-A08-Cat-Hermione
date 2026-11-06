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
    setSent(true);
  };

  return (
    <section className="bg-background py-12 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 items-center gap-8 rounded-3xl border border-borderSoft bg-gradient-color p-5 sm:gap-10 sm:p-8 md:p-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 py-1 pl-1 pr-4 font-textFont text-[13px] font-semibold text-brand">
              <span className="flex size-7 items-center justify-center rounded-full bg-headingColor text-background">
                <BsEnvelope size={13} />
              </span>
              Newsletter
            </span>

            <h2 className="mt-5 font-headingFont text-[32px] leading-tight text-headingColor sm:text-[48px]">
              Stay Connected With Every Act of Kindness
            </h2>

            <p className="mt-4 max-w-130 font-textFont text-[15px] font-medium text-bodyText opacity-80 sm:text-[18px]">
              Subscribe to receive upcoming donation events, volunteer
              opportunities and stories from the communities we serve. One email
              a month, no spam, and you can unsubscribe anytime.
            </p>
          </div>

          <div className="flex min-h-90 flex-col justify-center rounded-3xl bg-brand p-5 sm:p-6 md:p-8">
            {sent ? (
              <div className="text-center text-white">
                <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-white/25">
                  <BsEnvelope size={22} />
                </span>
                <h3 className="mt-5 font-headingFont text-[28px] sm:text-[32px]">
                  Coming Soon
                </h3>
                <p className="mx-auto mt-2 max-w-sm font-textFont text-[15px] font-medium sm:text-[16px]">
                  Our newsletter is almost ready. We are putting the finishing
                  touches on it and will start sending updates very soon. Thank
                  you for your interest and patience.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 cursor-pointer rounded-full bg-white px-6 py-2.5 font-textFont text-[14px] font-bold text-gray-900 transition-transform duration-300 hover:scale-105"
                >
                  Go back
                </button>
              </div>
            ) : (
              <div className="w-full space-y-4 sm:space-y-5">
                <div>
                  <label className="mb-2 block font-textFont text-[14px] font-semibold text-white">
                    Your name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full rounded-2xl bg-white/25 px-5 py-3.5 font-textFont text-[15px] font-medium text-white outline-none placeholder:text-white/70 focus:bg-white/35 sm:py-4"
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
                    className="w-full rounded-2xl bg-white/25 px-5 py-3.5 font-textFont text-[15px] font-medium text-white outline-none placeholder:text-white/70 focus:bg-white/35 sm:py-4"
                  />
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                  <div className="min-w-0 flex-1">
                    <label className="mb-2 block font-textFont text-[14px] font-semibold text-white">
                      I want to hear about
                    </label>
                    <div className="relative">
                      <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        style={{ appearance: "none", WebkitAppearance: "none" }}
                        className="w-full cursor-pointer rounded-2xl bg-white/25 py-3.5 pl-5 pr-14 font-textFont text-[15px] font-medium text-white outline-none focus:bg-white/35 sm:py-4"
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
                    className="flex w-full shrink-0 cursor-pointer items-center justify-center gap-3 rounded-full bg-white py-2 pl-2 pr-6 font-textFont text-[15px] font-bold text-gray-900 transition-transform duration-300 hover:scale-[1.02] sm:inline-flex sm:w-auto sm:justify-start sm:hover:scale-105"
                  >
                    <span className="flex size-10 items-center justify-center rounded-full bg-gray-900 text-white">
                      <BsSend size={15} />
                    </span>
                    Subscribe
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Newsletter;