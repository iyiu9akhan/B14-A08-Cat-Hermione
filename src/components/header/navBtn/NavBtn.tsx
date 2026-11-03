"use client";
import React, { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { IconType } from "react-icons";
import {
  BsBoxArrowInRight,
  BsBoxArrowRight,
  BsCalendar3,
  BsCheckCircle,
  BsChevronDown,
  BsGear,
  BsPersonFill,
  BsPlusCircle,
} from "react-icons/bs";
import { signOut } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/Spinner";
import { ButtonLink } from "@/components/ui/ButtonLink";
import ProfileModal from "@/components/profile/ProfileModal";

export type NavUser = {
  name: string;
  email: string;
  image?: string | null;
};

type NavBtnProps = {
  user: NavUser | null;
};

type MenuItem = {
  label: string;
  href: string;
  icon: IconType;
};

const menuItems: MenuItem[] = [
  { label: "Create Event", href: "/create-event", icon: BsPlusCircle },
  { label: "Manage Events", href: "/events/manage", icon: BsGear },
  { label: "Joined Events", href: "/joined-events", icon: BsCheckCircle },
];

const Avatar = ({ src, alt }: { src?: string | null; alt: string }) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <span className="relative block size-full">
      <span className="flex size-full items-center justify-center bg-brand/10 text-brand">
        <BsPersonFill size={22} />
      </span>

      {src && !failed && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </span>
  );
};

const NavBtn = ({ user }: NavBtnProps) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Local state for name/image so header updates instantly after profile save
  const [localName, setLocalName] = useState(user?.name ?? "");
  const [localImage, setLocalImage] = useState(user?.image ?? null);

  useEffect(() => {
    setLocalName(user?.name ?? "");
    setLocalImage(user?.image ?? null);
  }, [user?.name, user?.image]);

  const isBusy = isLoggingOut || isPending;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const { error } = await signOut();

      if (error) {
        toast.error(error.message || "Failed to log out.");
        setIsLoggingOut(false);
        return;
      }

      setOpen(false);
      toast.success("Logged out successfully!");
      window.location.href = "/login";
      // startTransition(() => {
      //   router.push("/");
      //   router.refresh();
      // });
    } catch {
      toast.error("Something went wrong. Please try again.");
      setIsLoggingOut(false);
    }
  };

  const handleProfileBlockClick = () => {
    setOpen(false);
    setProfileModalOpen(true);
  };

  const handleProfileUpdate = (updated: { name: string; image: string }) => {
    setLocalName(updated.name);
    setLocalImage(updated.image);
  };

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <ButtonLink
          href="/login"
          icon={<BsBoxArrowInRight size={18} />}
          spinnerSize={18}
          className="inline-flex items-center gap-2 rounded-b-2xl rounded-r-2xl bg-brand px-4 py-2 text-sm font-semibold capitalize font-textFont text-textColor shadow-sm"
        >
          login
        </ButtonLink>
      </div>
    );
  }

  const { email } = user;

  return (
    <>
      <div className="flex items-center gap-3">
        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-haspopup="menu"
            aria-expanded={open}
            className="flex cursor-pointer items-center gap-2"
          >
            <span className="block size-10 overflow-hidden rounded-full ring-2 ring-brand/60">
              <Avatar key={localImage} src={localImage} alt={localName} />
            </span>
            <BsChevronDown
              size={14}
              className={`transition-transform duration-300 ${
                open ? "rotate-180 text-brand" : "text-bodyText"
              }`}
            />
          </button>

          {open && (
            <div
              role="menu"
              className="absolute right-0 top-full z-30 mt-3 w-64 overflow-hidden rounded-2xl border border-borderSoft bg-background shadow-xl"
            >
              <button
                type="button"
                onClick={handleProfileBlockClick}
                className="w-full border-b border-borderSoft px-4 py-3 text-left transition-colors hover:bg-brand/10 cursor-pointer"
              >
                <p className="truncate font-textFont text-[15px] font-bold text-headingColor">
                  {localName}
                </p>
                <p className="truncate font-textFont text-[13px] text-bodyText">
                  {email}
                </p>
              </button>

              <div className="py-2">
                {menuItems.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 font-textFont text-[14px] font-medium text-headingColor transition-colors duration-300 hover:bg-brand/10"
                  >
                    <Icon size={16} className="text-brand" />
                    {label}
                  </Link>
                ))}
              </div>

              <div className="border-t border-borderSoft py-2 md:hidden">
                <Link
                  href="/#campaigns"
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 font-textFont text-[14px] font-medium text-headingColor transition-colors duration-300 hover:bg-brand/10"
                >
                  <BsCalendar3 size={16} className="text-brand" />
                  Upcoming Events
                </Link>
              </div>

              {/* 4. Logout */}
              <div className="border-t border-borderSoft">
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  disabled={isBusy}
                  aria-busy={isBusy}
                  className="flex w-full cursor-pointer items-center gap-3 px-4 py-4.5 font-textFont text-[14px] font-medium text-redBtn transition-colors duration-300 hover:bg-redBtn/10 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isBusy ? (
                    <Spinner size={16} />
                  ) : (
                    <BsBoxArrowRight size={16} />
                  )}
                  {isBusy ? "Logging out..." : "Logout"}
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={isBusy}
          aria-busy={isBusy}
          className="hidden md:inline-flex cursor-pointer items-center gap-2 rounded-xl border border-borderSoft px-4 py-2 font-textFont text-sm font-semibold text-redBtn transition-colors duration-300 hover:bg-redBtn hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isBusy ? <Spinner size={16} /> : <BsBoxArrowRight size={16} />}
          {isBusy ? "Logging out..." : "Logout"}
        </button>
      </div>

      {/* profile modal */}
      {user && (
        <ProfileModal
          open={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
          user={{ name: localName, email, image: localImage }}
          onUpdate={handleProfileUpdate}
        />
      )}
    </>
  );
};

export default NavBtn;