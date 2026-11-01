"use client";

import React, { useState } from "react";
import { BsCheck2, BsHeartPulse } from "react-icons/bs";

type EventJoinButtonProps = {
  isPast: boolean; 
};

const EventJoinButton = ({ isPast }: EventJoinButtonProps) => {
  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  const handleJoin = async () => {
    if (isPast || isJoining || hasJoined) return;

    try {
      setIsJoining(true);

      // TODO: ekhane backend join API call boshao, jemon:
      // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}/join`, {
      //   method: "POST",
      // });

      setHasJoined(true);
    } catch (error) {
      console.error("Failed to join event:", error);
    } finally {
      setIsJoining(false);
    }
  };

  const label = isPast
    ? "Event Ended"
    : hasJoined
      ? "Joined"
      : isJoining
        ? "Joining..."
        : "Join Event";

  return (
    <button
      type="button"
      onClick={handleJoin}
      disabled={isPast || isJoining || hasJoined}
      className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand px-8 py-3.5 font-textFont text-[14px] font-bold text-textColor shadow-lg transition-transform duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
    >
      {hasJoined ? <BsCheck2 size={18} /> : <BsHeartPulse size={17} />}
      {label}
    </button>
  );
};

export default EventJoinButton;