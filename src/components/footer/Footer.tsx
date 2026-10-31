import React from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "../container/Container";
import {
  BsArrowUpRight,
  BsCalendarEventFill,
  BsClipboardCheck,
  BsGeoAltFill,
  BsTelephoneFill,
  BsEnvelopeFill,
} from "react-icons/bs";

const socials = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/events" },
  { label: "Plan Your Event", href: "/events/create" },
  { label: "Registration", href: "/registration" },
];

const Footer = () => {
  return (
    <div className="bg-background pt-20">
      <div className="rounded-t-[40px] bg-gradient-color px-6 py-12 md:px-12">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:items-end">
            <div className="order-2 lg:order-1">
              <h3 className="font-headingFont text-[28px] text-headingColor">
                Contact
              </h3>

              <ul className="mt-4 space-y-3 font-textFont text-[15px] font-medium text-bodyText">
                <li className="flex items-start gap-3">
                  <BsGeoAltFill className="mt-1 shrink-0 text-brand" />
                  House 12, Road 5, Dhanmondi, Dhaka 1209
                </li>
                <li className="flex items-center gap-3">
                  <BsTelephoneFill className="shrink-0 text-brand" />
                  +880 1700-000000
                </li>
                <li className="flex items-center gap-3">
                  <BsEnvelopeFill className="shrink-0 text-brand" />
                  hello@hermione.org
                </li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {socials.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="inline-flex items-center gap-1.5 font-textFont text-[14px] font-medium text-bodyText transition hover:text-brand"
                  >
                    {item.label}
                    <BsArrowUpRight size={11} className="text-brand" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="order-1 flex flex-col items-center text-center lg:order-2">
              <div className="flex size-28 items-center justify-center">
                <Image
                  src="/brand-logo-light.png"
                  alt="Hermione Logo"
                  width={200}
                  height={200}
                  className="block h-24 w-auto rotate-90 dark:hidden"
                />
                <Image
                  src="/brand-logo-dark.png"
                  alt="Hermione Logo"
                  width={200}
                  height={200}
                  className="hidden h-24 w-auto rotate-90 dark:block"
                />
              </div>

              <h2 className="mt-2 font-headingFont text-[56px] leading-none text-headingColor">
                Hermione
              </h2>
              <p className="mt-3 font-headingFont text-[18px] italic text-bodyText opacity-80">
                Empowering lives across Bangladesh
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 rounded-b-2xl rounded-r-2xl bg-brand px-7 py-3 font-textFont text-[14px] font-semibold text-textColor shadow-lg transition-transform duration-300 hover:scale-105"
                >
                  <BsClipboardCheck />
                  Upcoming Events
                </Link>
                <Link
                  href="/events/create"
                  className="inline-flex items-center gap-2 rounded-b-2xl rounded-r-2xl border border-borderSoft bg-background px-7 py-3 font-textFont text-[14px] font-semibold text-headingColor shadow-lg transition-transform duration-300 hover:scale-105"
                >
                  <BsCalendarEventFill className="text-brand" />
                  Plan Your Event
                </Link>
              </div>
            </div>

            <div className="order-3 lg:text-right">
              <h3 className="font-headingFont text-[28px] text-headingColor">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-3 font-textFont text-[15px] font-medium text-bodyText">
                {quickLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="transition hover:text-brand"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-borderSoft pt-6 font-textFont text-[13px] font-medium text-bodyText opacity-80 sm:flex-row">
            <p>© 2026 Hermione. All rights reserved.</p>
            <div className="flex gap-5">
              <Link href="#" className="transition hover:text-brand">
                Privacy Policy
              </Link>
              <Link href="#" className="transition hover:text-brand">
                Terms of Use
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Footer;