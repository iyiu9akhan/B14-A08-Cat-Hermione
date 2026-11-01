"use client";

import { useTheme } from "next-themes";
import { BsSun, BsMoonStars } from "react-icons/bs";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="flex size-10 items-center justify-center rounded-full border border-borderSoft text-headingColor transition hover:border-brand hover:text-brand cursor-pointer"
    >
      <BsMoonStars size={18} className="block dark:hidden" />
      <BsSun size={18} className="hidden dark:block" />
    </button>
  );
};

export default ThemeToggle;
