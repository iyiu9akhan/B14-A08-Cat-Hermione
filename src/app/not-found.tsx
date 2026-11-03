import React from "react";
import { BsArrowRight, BsHouse } from "react-icons/bs";
import Container from "@/components/container/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

const PlugIllustration = () => (
  <svg
    viewBox="0 0 420 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-auto w-full max-w-sm"
    aria-hidden="true"
  >
    <path
      d="M120 320 C 120 250, 110 200, 160 205 C 200 210, 205 175, 215 165"
      className="stroke-headingColor"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M330 120 C 360 110, 380 125, 420 100"
      className="stroke-headingColor"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />
    <g transform="rotate(-25 215 150)">
      <rect
        x="170"
        y="125"
        width="62"
        height="50"
        rx="14"
        className="fill-background stroke-headingColor"
        strokeWidth="5"
      />
      <rect x="232" y="132" width="34" height="9" rx="4.5" className="fill-brand" />
      <rect x="232" y="159" width="34" height="9" rx="4.5" className="fill-brand" />
    </g>
    <g transform="rotate(-25 320 110)">
      <rect
        x="290"
        y="80"
        width="70"
        height="62"
        rx="18"
        className="fill-headingColor"
      />
      <circle cx="318" cy="111" r="20" className="fill-brand" />
      <circle cx="318" cy="111" r="9" className="fill-headingColor" />
    </g>
    <g className="stroke-headingColor" strokeWidth="3" strokeLinecap="round">
      <line x1="262" y1="60" x2="270" y2="76" />
      <line x1="288" y1="48" x2="290" y2="66" />
      <line x1="236" y1="76" x2="248" y2="88" />
      <line x1="250" y1="190" x2="264" y2="182" />
      <line x1="270" y1="214" x2="280" y2="200" />
      <line x1="300" y1="224" x2="302" y2="208" />
      <line x1="228" y1="108" x2="214" y2="104" />
    </g>
  </svg>
);

const NotFound = () => {
  return (
    <section className="bg-background py-4 sm:py-30">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-borderSoft bg-brand/5 px-6 py-6 sm:px-12 sm:py-8 lg:px-16">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div>
              <h1 className="font-headingFont text-[72px] font-bold leading-none text-headingColor sm:text-[104px]">
                404.
              </h1>

              <h2 className="mt-2 font-headingFont text-[28px] font-semibold leading-tight text-headingColor sm:text-[36px]">
                Page{" "}
                <span className="rounded-lg bg-brand px-3 text-textColor">
                  not found.
                </span>
              </h2>

              <p className="mt-3 max-w-md font-textFont text-[15px] leading-relaxed text-bodyText sm:text-[16px]">
                The page you are looking for may have been moved, deleted, or
                never existed. Let&apos;s get you back to something that
                matters.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <ButtonLink
                  href="/"
                  icon={<BsHouse size={16} />}
                  spinnerSize={16}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 font-textFont text-[14px] font-semibold text-textColor shadow-lg transition-transform duration-300 hover:scale-105"
                >
                  Back to Home
                </ButtonLink>

                <ButtonLink
                  href="/events"
                  icon={<BsArrowRight />}
                  iconPosition="right"
                  spinnerSize={16}
                  className="inline-flex items-center gap-2 rounded-full border border-borderSoft bg-background px-8 py-3.5 font-textFont text-[14px] font-semibold text-headingColor transition-colors duration-300 hover:border-brand hover:text-brand"
                >
                  Browse Events
                </ButtonLink>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <PlugIllustration />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default NotFound;
