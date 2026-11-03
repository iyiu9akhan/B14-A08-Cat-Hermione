"use client";

import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { BsPeopleFill } from "react-icons/bs";
import { joinEvent, leaveEvent } from "@/app/events/actions";

type EventJoinContextType = {
  count: number;
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
  isPast,
  children,
}: {
  eventId: string;
  userEmail: string | null;
  initialJoined: boolean;
  initialCount: number;
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
  const { count } = useEventJoin();

  return (
    <span className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-borderSoft bg-background/90 mb-7.5 px-3.5 py-1.5 font-textFont text-[13px] font-bold text-headingColor shadow-md backdrop-blur-sm capitalize">
      <BsPeopleFill className="text-brand" size={15} />
      <span>{count} joined</span>
    </span>
  );
};
