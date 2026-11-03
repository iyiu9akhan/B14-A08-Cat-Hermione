"use client";

import React from "react";
import { BsBoxArrowRight, BsHeartPulse } from "react-icons/bs";
import { useEventJoin } from "./EventJoinContext";

const EventJoinButton = () => {
  const { isPast, hasJoined, isSubmitting, toggleJoin } = useEventJoin();

  if (isPast) {
    return (
      <button
        type="button"
        disabled
        className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full bg-brand px-8 py-3.5 font-textFont text-[14px] font-bold text-textColor opacity-60 shadow-lg"
      >
        <BsHeartPulse size={17} />
        Event Ended
      </button>
    );
  }

  if (hasJoined) {
    return (
      <button
        type="button"
        onClick={toggleJoin}
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-borderSoft bg-background px-8 py-3.5 font-textFont text-[14px] font-bold text-redBtn shadow-lg transition-all duration-300 hover:scale-105 hover:border-redBtn hover:bg-redBtn hover:text-white disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
      >
        <BsBoxArrowRight size={17} />
        Leave Event
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleJoin}
      disabled={isSubmitting}
      aria-busy={isSubmitting}
      className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-brand px-8 py-3.5 font-textFont text-[14px] font-bold text-textColor shadow-lg transition-transform duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
    >
      <BsHeartPulse size={17} />
      Join Event
    </button>
  );
};

export default EventJoinButton;
