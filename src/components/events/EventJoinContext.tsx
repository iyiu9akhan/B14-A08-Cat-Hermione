"use client";

import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { BsPeopleFill } from "react-icons/bs";
import { joinEvent, leaveEvent } from "@/app/events/actions";

type EventJoinContextType = {
  count: number;
  maxParticipants: number;
  hasJoined: boolean;
  isPast: boolean;
  isSubmitting: boolean;
  toggleJoin: () => Promise<void>;
};

const EventJoinContext = createContext<EventJoinContextType | null>(null);

export const useEventJoin = () => {
  const context = useContext(EventJoinContext);
  if (!context) {
    throw new Error("useEventJoin must be used within an EventJoinProvider");
  }
  return context;
};

export const EventJoinProvider = ({
  eventId,
  userEmail,
  initialJoined,
  initialCount,
  maxParticipants,
  isPast,
  children,
}: {
  eventId: string;
  userEmail: string | null;
  initialJoined: boolean;
  initialCount: number;
  maxParticipants: number;
  isPast: boolean;
  children: React.ReactNode;
}) => {
  const [hasJoined, setHasJoined] = useState(initialJoined);
  const [count, setCount] = useState(initialCount);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleJoin = async () => {
    if (isPast || isSubmitting) return;

    if (!userEmail) {
      toast.error("Please login first.");
      return;
    }

    const nextJoined = !hasJoined;

    // Optimistic update
    setHasJoined(nextJoined);
    setCount((prev) => (nextJoined ? prev + 1 : Math.max(0, prev - 1)));
    setIsSubmitting(true);

    try {
      const result = nextJoined
        ? await joinEvent(eventId)
        : await leaveEvent(eventId);

      if (!result.success) {
        // Revert on failure
        setHasJoined(!nextJoined);
        setCount((prev) => (!nextJoined ? prev + 1 : Math.max(0, prev - 1)));
        toast.error(
          result.message ||
            (nextJoined ? "Failed to join event." : "Failed to leave event.")
        );
        return;
      }

      if (typeof result.participantsCount === "number") {
        setCount(result.participantsCount);
      }
      toast.success(nextJoined ? "Joined the event." : "You left the event.");
    } catch {
      // Revert on failure
      setHasJoined(!nextJoined);
      setCount((prev) => (!nextJoined ? prev + 1 : Math.max(0, prev - 1)));
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <EventJoinContext.Provider
      value={{
        count,
        maxParticipants,
        hasJoined,
        isPast,
        isSubmitting,
        toggleJoin,
      }}
    >
      {children}
    </EventJoinContext.Provider>
  );
};

export const EventParticipantBadge = () => {
  const { count, maxParticipants } = useEventJoin();
  const spotsLeft = maxParticipants - count;
  const isFull = spotsLeft <= 0;

  let spotsText: string;
  if (isFull) {
    spotsText = "Event Full";
  } else {
    spotsText = `${spotsLeft} ${spotsLeft === 1 ? "spot" : "spots"} left`;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-textFont text-[13px] font-bold shadow-md capitalize ${
        isFull
          ? "border-orange-400/60 bg-background text-orange-500"
          : "border-borderSoft bg-background text-headingColor"
      }`}
    >
      <BsPeopleFill className="text-brand" size={15} />
      <span>
        {count} Joined · {spotsText}
      </span>
    </span>
  );
};
