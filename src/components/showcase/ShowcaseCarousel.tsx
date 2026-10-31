"use client";

import { useRef } from "react";
import Image from "next/image";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

type Props = {
  images: { src: string; alt: string }[];
};

const ShowcaseCarousel = ({ images }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative h-80 overflow-hidden rounded-2xl">
      <div ref={ref} className="carousel h-full w-full">
        {images.map((img) => (
          <div key={img.src} className="carousel-item relative h-full w-full">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-3 right-3 flex gap-2">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Previous"
          className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-white text-gray-800"
        >
          <BsChevronLeft size={14} />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Next"
          className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-white text-gray-800"
        >
          <BsChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default ShowcaseCarousel;