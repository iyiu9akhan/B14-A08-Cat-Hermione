"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { IconType } from "react-icons";
import {
  BsBoxArrowInRight,
  BsBoxArrowRight,
  BsCheckCircle,
  BsChevronDown,
  BsGear,
  BsPersonFill,
  BsPlusCircle,
} from "react-icons/bs";
import { signOut } from "@/lib/auth-client";

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
  { label: "Manage Events", href: "/manage-events", icon: BsGear },
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
  console.log(user);

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
    try {
      const { error } = await signOut();

      if (error) {
        toast.error(error.message || "Failed to log out.");
        return;
      }

      setOpen(false);
      toast.success("Logged out successfully!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-b-2xl rounded-r-2xl bg-brand px-4 py-2 text-sm font-semibold capitalize font-textFont text-textColor shadow-sm"
        >
          <BsBoxArrowInRight size={18} />
          login
        </Link>
      </div>
    );
  }

  const { name, email, image } = user;

  return (
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
            <Avatar key={image} src={image} alt={name} />
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
            <div className="border-b border-borderSoft px-4 py-3">
              <p className="truncate font-textFont text-[15px] font-bold text-headingColor">
                {name}
              </p>
              <p className="truncate font-textFont text-[13px] text-bodyText">
                {email}
              </p>
            </div>

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

            <div className="border-t border-borderSoft py-2">
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 font-textFont text-[14px] font-medium text-redBtn transition-colors duration-300 hover:bg-redBtn/10"
              >
                <BsBoxArrowRight size={16} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-borderSoft px-4 py-2 font-textFont text-sm font-semibold text-redBtn transition-colors duration-300 hover:bg-redBtn/10"
      >
        <BsBoxArrowRight size={16} />
        Logout
      </button>
    </div>
  );
};

export default NavBtn;