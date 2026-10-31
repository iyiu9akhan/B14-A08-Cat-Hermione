import React from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "../container/Container";
import { BsArrowUpRight } from "react-icons/bs";

const features = [
  {
    tag: "Community",
    title: "Community-Led Drives",
    description:
      "Every citizen can organize cleanups, winter drives, and food distributions in their local area in minutes.",
    image: "/features/Community-Led-Drives.jpg",
    highlight: false,
  },
  {
    tag: "Participation",
    title: "One-Click Participation",
    description:
      "Join verified social initiatives with a single click and coordinate directly with local volunteer leaders.",
    image: "/features/join-volunteer.jpg",
    highlight: true,
  },
  {
    tag: "Control",
    title: "Creator Controls",
    description:
      "Manage, update, and track participation for your own initiatives with built-in creator authorization.",
    image: "/features/creator-controls.jpg",
    highlight: false,
  },
  {
    tag: "Discovery",
    title: "Upcoming Only Discovery",
    description:
      "Strict future-date filters guarantee you will always discover upcoming active initiatives that need volunteers.",
    image: "/features/upcoming-events.jpg",
    highlight: false,
  },
];

const Features = () => {
  return (
    <div className="bg-background py-20">
      <Container>
        <div className="mx-auto mb-16 max-w-150 text-center">
          <p className="mb-3 font-textFont text-[13px] font-bold uppercase tracking-widest text-brand">
            Platform Features
          </p>
          <h2 className="mb-4 font-headingFont text-[48px] leading-tight text-headingColor">
            Built for Grassroots Action
          </h2>
          <p className="font-textFont text-[18px] font-medium text-bodyText opacity-80">
            A frictionless platform connecting compassionate citizens with
            direct local community initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => (
            <article
              key={item.title}
              className={`flex flex-col rounded-3xl p-6 ${
                item.highlight ? "bg-brand" : "bg-borderSoft/40"
              }`}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`rounded-full border px-3 py-1 font-textFont text-[10px] font-bold uppercase tracking-wide ${
                    item.highlight
                      ? "border-white/40 text-white"
                      : "border-borderSoft text-headingColor"
                  }`}
                >
                  {item.tag}
                </span>
                <Link
                  href="#"
                  aria-label={item.title}
                  className={`flex size-10 items-center justify-center rounded-full transition-transform duration-300 hover:rotate-45 ${
                    item.highlight
                      ? "bg-white text-gray-800"
                      : "bg-background text-headingColor"
                  }`}
                >
                  <BsArrowUpRight size={14} />
                </Link>
              </div>

              <h3
                className={`mt-6 font-headingFont text-[26px] leading-tight ${
                  item.highlight ? "text-white" : "text-headingColor"
                }`}
              >
                {item.title}
              </h3>

              <p
                className={`mt-3 font-textFont text-[15px] font-medium ${
                  item.highlight ? "text-white/90" : "text-bodyText"
                }`}
              >
                {item.description}
              </p>

              <div className="relative mt-8 aspect-4/3 w-full overflow-hidden rounded-2xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </article>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Features;