"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  BsCalendar3,
  BsChevronDown,
  BsEnvelope,
  BsGeoAlt,
  BsImage,
  BsPlusCircle,
  BsTag,
  BsType,
} from "react-icons/bs";
import FormField, { inputClass } from "./FormField";

type EventForm = {
  title: string;
  type: string;
  date: string;
  location: string;
  photoURL: string;
  description: string;
};

type Errors = Partial<Record<keyof EventForm, string>>;

type CreateEventFormProps = {
  organizerEmail: string;
};

interface CreateEventData {
  title: string;
  type: string;
  date: string;
  location: string;
  photoURL: string;
  description: string;
  organizerEmail: string;
}

const initialForm: EventForm = {
  title: "",
  type: "Donation",
  date: "",
  location: "",
  photoURL: "",
  description: "",
};

const eventTypes = [
  "Donation",
  "Food",
  "Clothing",
  "Education",
  "Cleanup",
  "Plantation",
];

const photoPresets = [
  { label: "Food Distribution", image: "/presetsPhoto/food-distribution.jpg" },
  { label: "School Kits", image: "/presetsPhoto/school-kits.jpg" },
  { label: "Tree Plantation", image: "/presetsPhoto/tree-plantation.jpg" },
  { label: "Cleanup", image: "/presetsPhoto/cleanup.jpg" },
  { label: "Blanket Relief", image: "/presetsPhoto/blanket-relief.jpg" },
];

const presetImages = photoPresets.map((p) => p.image);

const getToday = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().split("T")[0];
};

const validate = (values: EventForm): Errors => {
  const errors: Errors = {};

  if (!values.title.trim()) errors.title = "Event title is required.";

  if (!values.type) errors.type = "Please select an event type.";

  if (!values.date) errors.date = "Event date is required.";
  else if (values.date < getToday())
    errors.date = "Event date must be today or in the future.";

  if (!values.location.trim())
    errors.location = "Location / venue is required.";

  if (!values.photoURL.trim())
    errors.photoURL = "Thumbnail image URL is required.";
  else if (
    !presetImages.includes(values.photoURL) &&
    !/^https?:\/\/\S+$/.test(values.photoURL)
  )
    errors.photoURL = "Please enter a valid URL (http or https).";

  if (!values.description.trim())
    errors.description = "Event description is required.";
  else if (values.description.trim().length < 20)
    errors.description = "Description must be at least 20 characters.";

  return errors;
};

const CreateEventForm = ({ organizerEmail }: CreateEventFormProps) => {
  const router = useRouter();
  const [form, setForm] = useState<EventForm>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [today, setToday] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setToday(getToday());
  }, []);

  const updateField = (name: keyof EventForm, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    updateField(e.target.name as keyof EventForm, e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validate(form);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error(Object.values(newErrors)[0] as string);
      return;
    }

    const data: CreateEventData = {
      title: form.title.trim(),
      type: form.type,
      date: form.date,
      location: form.location.trim(),
      photoURL: form.photoURL.trim(),
      description: form.description.trim(),
      organizerEmail,
    };

    try {
      setIsSubmitting(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "user loggedin",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

      const result = await res.json();

      if (!result.insertedId) throw new Error("Event was not saved.");

      toast.success("Event published successfully!");
      setForm(initialForm);
      router.push("/events");
      router.refresh();
    } catch (error) {
      console.error("Failed to create event:", error);
      toast.error("Failed to publish event. Please try again.");
    } finally {
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
            placeholder="e.g. Winter Clothes Distribution – Sector 5, Uttara, Dhaka"
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

        <FormField
          label="Event Date"
          htmlFor="date"
          error={errors.date}
          hint="Dates must be in the future (today or later)"
        >
          <div className="relative">
            <BsCalendar3
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-bodyText"
            />
            <input
              id="date"
              name="date"
              type="date"
              min={today}
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
            placeholder="e.g. New Market, Dhaka"
            className={inputClass(!!errors.location)}
          />
        </div>
      </FormField>

      <FormField
        label="Thumbnail Image URL"
        htmlFor="photoURL"
        error={errors.photoURL}
        hint={
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>Quick photo presets:</span>
            {photoPresets.map((p, i) => (
              <React.Fragment key={p.label}>
                {i > 0 && <span>•</span>}
                <button
                  type="button"
                  onClick={() => updateField("photoURL", p.image)}
                  className={`cursor-pointer font-semibold text-brand transition-opacity duration-300 hover:opacity-70 ${
                    form.photoURL === p.image
                      ? "underline underline-offset-4"
                      : ""
                  }`}
                >
                  {p.label}
                </button>
              </React.Fragment>
            ))}
          </div>
        }
      >
        <div className="relative">
          <BsImage
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-bodyText"
          />
          <input
            id="photoURL"
            name="photoURL"
            type="url"
            value={form.photoURL}
            onChange={handleChange}
            placeholder="https://images.unsplash.com/photo-..."
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
          placeholder="Explain the purpose of the drive, volunteers required, items being distributed or tasks to complete..."
          className={`${inputClass(!!errors.description, false)} resize-y`}
        />
      </FormField>

      <div className="flex items-center justify-between gap-4 rounded-xl border border-borderSoft bg-brand/5 px-4 py-3.5 font-textFont text-[14px]">
        <span className="inline-flex items-center gap-2 text-bodyText">
          <BsEnvelope size={15} />
          Organizer Email attached:
        </span>
        <span className="font-bold text-headingColor">{organizerEmail}</span>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-brand px-7 py-3.5 font-textFont text-[15px] font-bold text-textColor shadow-lg transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
      >
        <BsPlusCircle size={18} />
        {isSubmitting ? "Publishing..." : "Publish Event"}
      </button>
    </form>
  );
};

export default CreateEventForm;