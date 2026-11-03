"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  BsCalendar3,
  BsChevronDown,
  BsGeoAlt,
  BsImage,
  BsTag,
  BsType,
} from "react-icons/bs";
import FormField, { inputClass } from "./FormField";
import { updateEvent } from "@/app/events/actions";
import type { EventItem } from "@/lib/events";
import { Spinner } from "@/components/ui/Spinner";

type EventForm = {
  title: string;
  type: string;
  date: string;
  location: string;
  photoURL: string;
  description: string;
};

type Errors = Partial<Record<keyof EventForm, string>>;

const eventTypes = [
  "Donation",
  "Food",
  "Clothing",
  "Education",
  "Cleanup",
  "Plantation",
];

const validate = (values: EventForm): Errors => {
  const errors: Errors = {};

  if (!values.title.trim()) errors.title = "Event title is required.";
  if (!values.date) errors.date = "Event date is required.";
  if (!values.location.trim())
    errors.location = "Location / venue is required.";

  if (!values.photoURL.trim())
    errors.photoURL = "Thumbnail image URL is required.";
  else if (
    !values.photoURL.startsWith("/") &&
    !/^https?:\/\/\S+$/.test(values.photoURL)
  )
    errors.photoURL = "Please enter a valid URL (http or https).";

  if (!values.description.trim())
    errors.description = "Event description is required.";
  else if (values.description.trim().length < 20)
    errors.description = "Description must be at least 20 characters.";

  return errors;
};

const EditEventForm = ({ event }: { event: EventItem }) => {
  const router = useRouter();

  const [form, setForm] = useState<EventForm>({
    title: event.title,
    type: event.type,
    date: event.date.slice(0, 10),
    location: event.location,
    photoURL: event.photoURL,
    description: event.description ?? "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isBusy = isSubmitting || isPending;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const name = e.target.name as keyof EventForm;
    setForm((prev) => ({ ...prev, [name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validate(form);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error(Object.values(newErrors)[0] as string);
      return;
    }

    try {
      setIsSubmitting(true);

      const result = await updateEvent(event._id as string, {
        title: form.title.trim(),
        type: form.type,
        date: form.date,
        location: form.location.trim(),
        photoURL: form.photoURL.trim(),
        description: form.description.trim(),
      });

      if (!result.success) {
        toast.error(result.message ?? "Failed to update event.");
        setIsSubmitting(false);
        return;
      }

      toast.success("Event updated successfully!");
      startTransition(() => {
        router.push(`/events/${event._id}`);
        router.refresh();
      });
    } catch (error) {
      console.error("Failed to update event:", error);
      toast.error("Failed to update event. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <FormField label="Event Title" htmlFor="title" error={errors.title}>
        <div className="relative">
          <BsType
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-bodyText"
          />
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            className={inputClass(!!errors.title)}
          />
        </div>
      </FormField>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="Event Type" htmlFor="type" error={errors.type}>
          <div className="relative">
            <BsTag
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-bodyText"
            />
            <select
              id="type"
              name="type"
              value={form.type}
              onChange={handleChange}
              className={`${inputClass(!!errors.type)} cursor-pointer appearance-none pr-10`}
            >
              {eventTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <BsChevronDown
              size={14}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-bodyText"
            />
          </div>
        </FormField>

        <FormField label="Event Date" htmlFor="date" error={errors.date}>
          <div className="relative">
            <BsCalendar3
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-bodyText"
            />
            <input
              id="date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className={`${inputClass(!!errors.date)} dark:scheme-dark`}
            />
          </div>
        </FormField>
      </div>

      <FormField
        label="Location / Venue"
        htmlFor="location"
        error={errors.location}
      >
        <div className="relative">
          <BsGeoAlt
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-bodyText"
          />
          <input
            id="location"
            name="location"
            type="text"
            value={form.location}
            onChange={handleChange}
            className={inputClass(!!errors.location)}
          />
        </div>
      </FormField>

      <FormField
        label="Thumbnail Image URL"
        htmlFor="photoURL"
        error={errors.photoURL}
      >
        <div className="relative">
          <BsImage
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-bodyText"
          />
          <input
            id="photoURL"
            name="photoURL"
            type="text"
            value={form.photoURL}
            onChange={handleChange}
            className={inputClass(!!errors.photoURL)}
          />
        </div>
      </FormField>

      <FormField
        label="Event Description"
        htmlFor="description"
        error={errors.description}
      >
        <textarea
          id="description"
          name="description"
          rows={5}
          value={form.description}
          onChange={handleChange}
          className={`${inputClass(!!errors.description, false)} resize-y`}
        />
      </FormField>

      <button
        type="submit"
        disabled={isBusy}
        aria-busy={isBusy}
        className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-brand px-7 py-3.5 font-textFont text-[15px] font-bold text-textColor shadow-lg transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
      >
        {isBusy ? <Spinner size={18} /> : null}
        {isBusy ? "Saving Changes..." : "Save Changes"}
      </button>
    </form>
  );
};

export default EditEventForm;
