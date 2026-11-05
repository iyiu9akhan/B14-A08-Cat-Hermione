"use client";
import React, { useRef, useState } from "react";
import { BsPeopleFill } from "react-icons/bs";

type ParticipantsSliderProps = {
  id?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  invalid?: boolean;
};

const ParticipantsSlider = ({
  id,
  value,
  onChange,
  min = 1,
  max = 30,
  invalid = false,
}: ParticipantsSliderProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const count = max - min + 1;
  const ratio = (value - min) / (max - min);
  const clamp = (n: number) => Math.min(max, Math.max(min, n));

  const setFromX = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const r = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const next = Math.round(min + r * (max - min));
    if (next !== value) onChange(next);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    setFromX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragging) setFromX(e.clientX);
  };

  const stopDragging = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setDragging(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const steps: Record<string, number> = {
      ArrowRight: 1,
      ArrowUp: 1,
      ArrowLeft: -1,
      ArrowDown: -1,
      PageUp: 5,
      PageDown: -5,
    };

    if (e.key in steps) {
      e.preventDefault();
      onChange(clamp(value + steps[e.key]));
    } else if (e.key === "Home") {
      e.preventDefault();
      onChange(min);
    } else if (e.key === "End") {
      e.preventDefault();
      onChange(max);
    }
  };

  return (
    <div className="flex items-stretch gap-3">
      <div
        id={id}
        role="slider"
        tabIndex={0}
        aria-label="Maximum participants"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`${value} participants`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onKeyDown={handleKeyDown}
        style={{ touchAction: "none" }}
        className={`relative flex h-16 flex-1 select-none items-center rounded-2xl border px-4 outline-none transition-shadow duration-300 focus-visible:ring-2 focus-visible:ring-brand/40 ${
          dragging ? "cursor-grabbing" : "cursor-pointer"
        } ${invalid ? "border-red-500" : "border-borderSoft"}`}
      >
        <BsPeopleFill
          size={15}
          className="pointer-events-none mr-3 shrink-0 text-bodyText"
        />

        <div ref={trackRef} className="relative h-full flex-1">
          <div className="absolute inset-0 flex items-center justify-between">
            {Array.from({ length: count }, (_, i) => {
              const v = min + i;
              const d = Math.abs(v - value);
              const base = v % 5 === 0 ? 22 : 16;
              const boost = d <= 3 ? (4 - d) * 3 : 0;
              const opacity = d === 0 ? 0 : Math.max(0.16, 0.95 - d * 0.2);

              return (
                <span
                  key={v}
                  className="w-0.5 rounded-full bg-headingColor transition-all duration-200"
                  style={{ height: base + boost, opacity }}
                />
              );
            })}
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 flex h-11 w-1.75 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-between"
            style={{
              left: `calc(1px + ${ratio} * (100% - 2px))`,
              transition: dragging ? "none" : "left 150ms ease-out",
            }}
          >
            <span className="size-1.75 rounded-full bg-brand" />
            <span className="w-0.75 flex-1 bg-brand" />
            <span className="size-1.75 rounded-full bg-brand" />
          </div>
        </div>
      </div>

      <div className="flex w-24 shrink-0 flex-col items-center justify-center rounded-2xl border border-borderSoft px-3">
        <span className="font-textFont text-[24px] font-bold leading-none text-headingColor tabular-nums">
          {value}
        </span>
        <span className="mt-1 font-textFont text-[11px] font-semibold uppercase tracking-wide text-bodyText">
          {value === 1 ? "person" : "people"}
        </span>
      </div>
    </div>
  );
};

export default ParticipantsSlider;
