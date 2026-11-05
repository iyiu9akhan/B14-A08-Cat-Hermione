"use client";
import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BsExclamationTriangle, BsPencilSquare, BsTrash } from "react-icons/bs";
import { deleteEvent } from "@/app/events/actions";
import { Spinner } from "@/components/ui/Spinner";
import { ButtonLink } from "@/components/ui/ButtonLink";

type EventOwnerActionsProps = {
  eventId: string;
};

const EventOwnerActions = ({ eventId }: EventOwnerActionsProps) => {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isBusy = isDeleting || isPending;

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const result = await deleteEvent(eventId);

      if (!result.success) {
        toast.error(result.message ?? "Failed to delete event.");
        setIsDeleting(false);
        setConfirming(false);
        return;
      }

      toast.success("Event deleted successfully!");
      startTransition(() => {
        router.push("/events/manage");
        router.refresh();
      });
    } catch {
      toast.error("Failed to delete event. Please try again.");
      setIsDeleting(false);
      setConfirming(false);
    }
  };

  if (confirming) {
    return (
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-redBtn/30 bg-redBtn/5 px-4 py-2.5 -mb-2.5">
        <span className="inline-flex items-center gap-2 font-textFont text-[13px] font-semibold text-headingColor">
          <BsExclamationTriangle size={14} className="text-redBtn" />
          Delete this event permanently?
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDelete}
            disabled={isBusy}
            aria-busy={isBusy}
            className="inline-flex h-9 scale-100 cursor-pointer items-center gap-2 rounded-full bg-redBtn px-4 font-textFont text-[12px] font-bold text-white transition-all duration-300 hover:scale-105 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
          >
            {isBusy ? <Spinner size={12} /> : <BsTrash size={12} />}
            {isBusy ? "Deleting..." : "Yes, delete"}
          </button>

          <button
            type="button"
            onClick={() => setConfirming(false)}
            disabled={isBusy}
            className="inline-flex h-9 scale-100 cursor-pointer items-center rounded-full border border-borderSoft bg-background px-4 font-textFont text-[12px] font-semibold text-headingColor transition-all duration-300 hover:scale-105 hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <ButtonLink
        href={`/events/${eventId}/edit`}
        icon={<BsPencilSquare size={13} />}
        spinnerSize={13}
        className="inline-flex h-10 scale-100 items-center gap-2 rounded-full bg-brand px-5 font-textFont text-[13px] font-bold text-textColor transition-all duration-300 hover:scale-105"
      >
        Edit Event
      </ButtonLink>

      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="inline-flex h-10 scale-100 cursor-pointer items-center gap-2 rounded-full border border-redBtn/40 bg-redBtn/5 px-5 font-textFont text-[13px] font-bold text-redBtn transition-all duration-300 hover:scale-105 hover:border-redBtn hover:bg-redBtn hover:text-white"
      >
        <BsTrash size={13} />
        Delete
      </button>
    </div>
  );
};

export default EventOwnerActions;
