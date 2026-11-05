"use client";
import { useEffect, useState } from "react";
import { Toaster, ToastBar, toast } from "react-hot-toast";
import {
  BsCheckCircle,
  BsExclamationCircle,
  BsExclamationTriangle,
  BsInfoCircle,
  BsXLg,
} from "react-icons/bs";
import type { IconType } from "react-icons";

type VariantKey = "success" | "error" | "loading" | "blank" | "custom" | "info";

const BRAND = "#ff692a";

const VARIANTS: Record<
  VariantKey,
  { color: string; title: string; Icon: IconType }
> = {
  success: { color: "#16a34a", title: "Success", Icon: BsCheckCircle },
  error: { color: "#ef4444", title: "Error", Icon: BsExclamationCircle },
  loading: { color: BRAND, title: "Please wait…", Icon: BsInfoCircle },
  blank: { color: BRAND, title: "Heads up", Icon: BsExclamationTriangle },
  custom: { color: BRAND, title: "Heads up", Icon: BsExclamationTriangle },
  info: { color: "#0ea5e9", title: "Information", Icon: BsInfoCircle },
};

const PALETTE = {
  light: {
    bg: "#ffffff",
    title: "#0f172a",
    text: "#475569",
    tile: "#ffffff",
    border: "rgba(15, 23, 42, 0.10)",
    tileBorder: "rgba(15, 23, 42, 0.08)",
    shadow:
      "0 14px 34px -10px rgba(15, 23, 42, 0.28), 0 2px 6px rgba(15, 23, 42, 0.08)",
    glow: 24,
    close: "#94a3b8",
    closeHover: "#334155",
    closeHoverBg: "rgba(15, 23, 42, 0.07)",
  },
  dark: {
    bg: "#131c2e",
    title: "#f8fafc",
    text: "#aab4c5",
    tile: "#1e293b",
    border: "rgba(255, 255, 255, 0.10)",
    tileBorder: "rgba(255, 255, 255, 0.10)",
    shadow: "0 18px 40px -10px rgba(0, 0, 0, 0.85), 0 2px 6px rgba(0, 0, 0, 0.4)",
    glow: 32,
    close: "#94a3b8",
    closeHover: "#f8fafc",
    closeHoverBg: "rgba(255, 255, 255, 0.12)",
  },
};

function useIsDark() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const isDarkEl = (el: HTMLElement) =>
      el.classList.contains("dark") ||
      el.getAttribute("data-theme") === "dark" ||
      el.getAttribute("data-mode") === "dark";

    const read = () =>
      setDark(isDarkEl(html) || isDarkEl(body) || html.style.colorScheme === "dark");

    read();
    const observer = new MutationObserver(read);
    observer.observe(html, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "data-mode", "style"],
    });
    observer.observe(body, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "data-mode"],
    });
    return () => observer.disconnect();
  }, []);

  return dark;
}

const toastCss = `
@keyframes app-toast-progress {
  from { transform: scaleX(1); }
  to { transform: scaleX(0); }
}
.app-toast-progress {
  transform-origin: left center;
  animation: app-toast-progress 3500ms linear forwards;
}
.app-toaster:hover .app-toast-progress {
  animation-play-state: paused;
}
@media (prefers-reduced-motion: reduce) {
  .app-toast-progress { display: none; }
}
`;

export default function AppToaster() {
  const isDark = useIsDark();
  const p = isDark ? PALETTE.dark : PALETTE.light;

  return (
    <>
      <style>{toastCss}</style>

      <Toaster
        position="top-center"
        containerStyle={{ top: 100 }}
        containerClassName="app-toaster"
        gutter={14}
        toastOptions={{
          duration: 3500,
          success: { duration: 3000 },
          error: { duration: 4500 },
        }}
      >
        {(t) => {
          const key: VariantKey = t.className === "info" ? "info" : t.type;
          const { color, title, Icon } = VARIANTS[key];
          const isLoading = t.type === "loading";
          const showProgress = !isLoading && Number.isFinite(t.duration);

          return (
            <ToastBar
              toast={t}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
                minWidth: "min(340px, calc(100vw - 32px))",
                maxWidth: "min(420px, calc(100vw - 32px))",
                padding: "14px 44px 16px 14px",
                borderRadius: 18,
                color: p.title,
                border: `1px solid ${p.border}`,
                background: `radial-gradient(120% 170% at 0% 0%, color-mix(in srgb, ${color} ${p.glow}%, transparent) 0%, transparent 60%), ${p.bg}`,
                boxShadow: p.shadow,
                fontFamily: "var(--font-quicksand), system-ui, sans-serif",
              }}
            >
              {({ icon, message }) => (
                <>
                  <span
                    aria-hidden
                    className="flex shrink-0 items-center justify-center"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 14,
                      color,
                      background: p.tile,
                      border: `1px solid ${p.tileBorder}`,
                      boxShadow: "0 2px 8px -2px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    {t.icon ? (
                      icon
                    ) : isLoading ? (
                      <span
                        className="size-5 animate-spin rounded-full border-[2.5px]"
                        style={{ borderColor: color, borderTopColor: "transparent" }}
                      />
                    ) : (
                      <Icon size={22} />
                    )}
                  </span>

                  <div className="ml-3.5 min-w-0 flex-1">
                    <p
                      className="text-[16px] leading-tight font-bold"
                      style={{ color: p.title }}
                    >
                      {title}
                    </p>
                    <div
                      className="mt-0.5 text-[13.5px] leading-snug font-medium [&>div]:m-0! [&>div]:justify-start!"
                      style={{ color: p.text }}
                    >
                      {message}
                    </div>
                  </div>

                  {!isLoading && (
                    <button
                      type="button"
                      onClick={() => toast.dismiss(t.id)}
                      aria-label="Close notification"
                      className="absolute top-3 right-3 flex size-6 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline-2"
                      style={{ color: p.close }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = p.closeHover;
                        e.currentTarget.style.background = p.closeHoverBg;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = p.close;
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <BsXLg size={11} />
                    </button>
                  )}

                  {showProgress && (
                    <span
                      aria-hidden
                      className="app-toast-progress absolute bottom-0 left-0 h-0.75 w-full"
                      style={{
                        background: color,
                        animationDuration: `${t.duration}ms`,
                      }}
                    />
                  )}
                </>
              )}
            </ToastBar>
          );
        }}
      </Toaster>
    </>
  );
}