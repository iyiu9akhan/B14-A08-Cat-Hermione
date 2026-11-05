"use client";

import React, { useEffect, useRef, useState } from "react";
import { BsPersonFill, BsX } from "react-icons/bs";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/Spinner";
import { updateUserProfile } from "@/app/profile/actions";
import { authClient } from "@/lib/auth-client";

type ProfileModalProps = {
  open: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
  onUpdate: (updated: { name: string; image: string }) => void;
};

const isValidHttpUrl = (url: string) => /^https?:\/\/\S+/.test(url.trim());

const ProfileModal = ({ open, onClose, user, onUpdate }: ProfileModalProps) => {
  const [name, setName] = useState(user.name || "");
  const [photoURL, setPhotoURL] = useState(user.image || "");
  const [failedURL, setFailedURL] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; photoURL?: string }>({});
  const [isSaving, setIsSaving] = useState(false);
  const [prevOpen, setPrevOpen] = useState(open);
  const backdropRef = useRef<HTMLDivElement>(null);

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setName(user.name || "");
      setPhotoURL(user.image || "");
      setFailedURL(null);
      setErrors({});
    }
  }

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const trimmedPhoto = photoURL.trim();
  const imgFailed = failedURL === trimmedPhoto;

  const validate = () => {
    const newErrors: { name?: string; photoURL?: string } = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!photoURL.trim()) newErrors.photoURL = "Photo URL is required";
    else if (!isValidHttpUrl(photoURL)) newErrors.photoURL = "Enter a valid image URL";
    return newErrors;
  };

  const handleSave = async () => {
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSaving(true);
    try {
      const result = await updateUserProfile({ name: name.trim(), image: photoURL.trim() });

      if (!result.success) {
        toast.error(result.message || "Failed to update profile.");
        return;
      }

      const client = authClient as any;
      if (typeof client.updateUser === "function") {
        await client.updateUser({ name: name.trim(), image: photoURL.trim() }).catch(() => {});
      }

      toast.success("Profile updated successfully!");
      onUpdate({ name: name.trim(), image: photoURL.trim() });
      onClose();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) onClose();
  };

  const previewSrc = trimmedPhoto && !imgFailed ? trimmedPhoto : null;

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-label="User Information"
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-borderSoft bg-background shadow-2xl">
       
        <div className="flex items-center justify-between border-b border-borderSoft px-6 py-4">
          <h2 className="font-headingFont text-[22px] italic text-headingColor">
            User Information
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center rounded-lg p-1.5 text-bodyText transition-colors hover:bg-brand/10 hover:text-brand cursor-pointer"
            aria-label="Close"
          >
            <BsX size={22} />
          </button>
        </div>


        <div className="p-6">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
       
            <div className="relative shrink-0">
              <div className="size-30 overflow-hidden rounded-xl border-2 border-borderSoft bg-brand/10">
                {previewSrc ? (
                  <img
                    src={previewSrc}
                    alt={name || "Profile"}
                    referrerPolicy="no-referrer"
                    onError={() => setFailedURL(trimmedPhoto)}
                    className="size-full object-cover"
                  />
                ) : (
                  <span className="flex size-full items-center justify-center text-brand">
                    <BsPersonFill size={52} />
                  </span>
                )}
              </div>
            </div>

     
            <div className="flex flex-1 flex-col gap-4 w-full">
         
              <div>
                <label
                  htmlFor="profile-name"
                  className="mb-1.5 block font-textFont text-[13px] font-bold text-headingColor"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="profile-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  placeholder="Your full name"
                  className={`w-full rounded-xl border bg-background px-4 py-2.5 font-textFont text-[14px] text-headingColor shadow-sm outline-none transition placeholder:text-bodyText/60 focus:ring-2 ${
                    errors.name
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-borderSoft focus:border-brand focus:ring-brand/20"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1.5 font-textFont text-[12px] text-red-500">{errors.name}</p>
                )}
              </div>

         
              <div>
                <label
                  htmlFor="profile-email"
                  className="mb-1.5 block font-textFont text-[13px] font-bold text-headingColor"
                >
                  Email
                </label>
                <input
                  id="profile-email"
                  type="email"
                  value={user.email}
                  disabled
                  readOnly
                  className="w-full cursor-not-allowed rounded-xl border border-borderSoft bg-background px-4 py-2.5 font-textFont text-[14px] text-bodyText opacity-60 shadow-sm outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="profile-photo"
                  className="mb-1.5 block font-textFont text-[13px] font-bold text-headingColor"
                >
                  Photo URL <span className="text-red-500">*</span>
                </label>
                <input
                  id="profile-photo"
                  type="url"
                  value={photoURL}
                  onChange={(e) => {
                    setPhotoURL(e.target.value);
                    setErrors((prev) => ({ ...prev, photoURL: undefined }));
                  }}
                  placeholder="https://example.com/photo.jpg"
                  className={`w-full rounded-xl border bg-background px-4 py-2.5 font-textFont text-[14px] text-headingColor shadow-sm outline-none transition placeholder:text-bodyText/60 focus:ring-2 ${
                    errors.photoURL
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-borderSoft focus:border-brand focus:ring-brand/20"
                  }`}
                />
                {errors.photoURL && (
                  <p className="mt-1.5 font-textFont text-[12px] text-red-500">{errors.photoURL}</p>
                )}
              </div>
            </div>
          </div>
        </div>

     
        <div className="flex items-center justify-end gap-3 border-t border-borderSoft px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="rounded-xl border border-borderSoft px-5 py-2.5 font-textFont text-[14px] font-semibold text-bodyText transition-colors hover:bg-brand/10 hover:text-headingColor disabled:opacity-60 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            aria-busy={isSaving}
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 font-textFont text-[14px] font-semibold text-textColor shadow-sm transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 cursor-pointer"
          >
            {isSaving && <Spinner size={15} />}
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;