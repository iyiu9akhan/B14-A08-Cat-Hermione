"use client";

import { useState } from "react";
import Image from "next/image";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

type Slide = {
  image: string;
  tag: string;
  label: string;
  title: string;
  text: string;
};

type Props = {
  slides: Slide[];
  dark?: boolean;
};

const solid = "linear-gradient(#000,#000)";
const outerCorner =
  "radial-gradient(circle at 0 0,#000 23.5px,transparent 24px)";
const innerCorner =
  "radial-gradient(circle at 100% 100%,transparent 23.5px,#000 24px)";

const layers = [
  { img: solid, size: "calc(100% - 143px) 100%", pos: "left 0 top 0" },
  { img: solid, size: "24px calc(100% - 23px)", pos: "right 120px top 0" },
  { img: outerCorner, size: "24px 24px", pos: "right 120px bottom 0" },
  { img: solid, size: "98px calc(100% - 63px)", pos: "right 24px top 0" },
  { img: solid, size: "24px calc(100% - 87px)", pos: "right 0 top 0" },
  { img: outerCorner, size: "24px 24px", pos: "right 0 bottom 64px" },
  { img: innerCorner, size: "24px 24px", pos: "right 96px bottom 40px" },
];

const notchMask: React.CSSProperties = {
  maskImage: layers.map((l) => l.img).join(","),
  maskSize: layers.map((l) => l.size).join(","),
  maskPosition: layers.map((l) => l.pos).join(","),
  maskRepeat: "no-repeat",
  WebkitMaskImage: layers.map((l) => l.img).join(","),
  WebkitMaskSize: layers.map((l) => l.size).join(","),
  WebkitMaskPosition: layers.map((l) => l.pos).join(","),
  WebkitMaskRepeat: "no-repeat",
};

const ShowcaseCard = ({ slides, dark = false }: Props) => {
  const [index, setIndex] = useState(0);
  const current = slides[index];

  const prev = () => setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));

  return (
    <div className="rounded-3xl bg-linear-to-b from-borderSoft from-30% to-transparent to-80% p-px">
      <div
        className={`grid grid-cols-1 gap-5 rounded-[calc(var(--radius-3xl)-1px)] p-5 sm:grid-cols-2 ${
          dark ? "bg-[#090d16]" : "bg-gradient-color"
        }`}
      >
        <div className="flex flex-col justify-between gap-8 p-2">
          <span
            className={`w-fit rounded-full px-5 py-2 font-textFont text-[12px] font-bold ${
              dark
                ? "bg-white/10 text-white"
                : "bg-headingColor text-background"
            }`}
          >
            {current.tag}
          </span>

          <div>
            <p
              className={`font-textFont text-[13px] font-semibold ${
                dark ? "text-white/60" : "text-bodyText opacity-70"
              }`}
            >
              {current.label}
            </p>
            <h3
              className={`mt-2 font-headingFont text-[36px] leading-tight ${
                dark ? "text-white" : "text-headingColor"
              }`}
            >
              {current.title}
            </h3>
            <p
              className={`mt-3 font-textFont text-[15px] font-medium ${
                dark ? "text-white/80" : "text-bodyText"
              }`}
            >
              {current.text}
            </p>
          </div>
        </div>

        <div className="relative min-h-80">
          <div
            style={notchMask}
            className="absolute inset-0 overflow-hidden rounded-2xl"
          >
            {slides.map((slide, i) => (
              <Image
                key={slide.image}
                src={slide.image}
                alt={slide.title}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className={`object-cover transition-opacity duration-500 ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          <div className="absolute bottom-0 right-0 flex h-16 w-30 items-center justify-center gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous"
              className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-orange-200 text-gray-800 transition hover:bg-brand hover:text-white dark:bg-orange-300"
            >
              <BsArrowLeft size={16} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next"
              className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-orange-200 text-gray-800 transition hover:bg-brand hover:text-white dark:bg-orange-300"
            >
              <BsArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseCard;