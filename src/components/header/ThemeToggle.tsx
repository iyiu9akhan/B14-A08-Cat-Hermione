"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BsSun, BsMoonStars } from "react-icons/bs";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="size-10" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex size-10 items-center justify-center rounded-full border border-borderSoft text-headingColor transition hover:border-brand hover:text-brand cursor-pointer"
    >
      {isDark ? <BsSun size={18} /> : <BsMoonStars size={18} />}
    </button>
  );
};

export default ThemeToggle;