"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

type Direction = "left" | "right";
type Go = (href: string, direction: Direction) => void;

const PANEL_COLOR = "#ff692a";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const WAVE = Array.from({ length: 41 }, (_, i) => {
  const y = i * 2.5;
  const x = 50 + 36 * Math.sin((y / 100) * Math.PI * 2);
  return `${x.toFixed(1)}% ${y}%`;
}).join(", ");
const LEFT_EDGE = `polygon(${WAVE}, 100% 100%, 100% 0%)`; 
const RIGHT_EDGE = `polygon(0% 0%, ${WAVE}, 0% 100%)`; 

const WAVE_W = "18.75%";
const START = "translateX(62.5%)"; 
const COVER = "translateX(-18.75%)"; 
const END = "translateX(-100%)"; 

const EASE = "cubic-bezier(.65, 0, .35, 1)";

function findCard(): HTMLElement | null {
  const marked = document.querySelector<HTMLElement>("[data-auth-card]");
  if (marked) return marked;

  const form = document.querySelector("form");
  if (!form) return null;
  const formWidth = form.getBoundingClientRect().width;

  let widest: HTMLElement | null = null;
  let el = form.parentElement;
  while (el && el !== document.body) {
    const width = el.getBoundingClientRect().width;
    const radius = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
    if (radius > 8 && width > 500) return el; // rounded card
    if (!widest && width >= formWidth * 2.2) widest = el;
    el = el.parentElement;
  }
  return widest;
}

const AuthTransitionContext = createContext<Go | null>(null);

export const useAuthTransition = () => useContext(AuthTransitionContext);

export function AuthTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const isBusy = useRef(false);
  const onArrive = useRef<(() => void) | null>(null);

  const fitToCard = useCallback(() => {
    const overlay = overlayRef.current;
    const card = findCard();
    if (!overlay || !card) return false;

    const r = card.getBoundingClientRect();
    overlay.style.top = `${r.top}px`;
    overlay.style.left = `${r.left}px`;
    overlay.style.width = `${r.width}px`;
    overlay.style.height = `${r.height}px`;
    overlay.style.borderRadius = getComputedStyle(card).borderRadius;
    return true;
  }, []);

  useIsoLayoutEffect(() => {
    if (!isBusy.current) return;
    fitToCard();
    onArrive.current?.();
  }, [pathname, fitToCard]);

  const go = useCallback<Go>(
    async (href, direction) => {
      if (isBusy.current) return;

      const overlay = overlayRef.current;
      const curtain = curtainRef.current;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!overlay || !curtain || reduceMotion) {
        router.push(href);
        return;
      }
      if (!fitToCard()) {
        console.warn(
          "[AuthTransition] Card not found. Add data-auth-card to the card div in AuthLayout."
        );
        router.push(href);
        return;
      }

      isBusy.current = true;
      overlay.style.display = "block";
      
      overlay.style.transform = direction === "right" ? "scaleX(-1)" : "none";

      try {
        await curtain.animate(
          [{ transform: START }, { transform: COVER }],
          { duration: 550, easing: EASE, fill: "forwards" }
        ).finished;

        await new Promise<void>((resolve) => {
          const timer = setTimeout(resolve, 3000);
          onArrive.current = () => {
            clearTimeout(timer);
            resolve();
          };
          router.push(href, { scroll: false });
        });
        onArrive.current = null;
        await new Promise((resolve) => setTimeout(resolve, 100)); 
        fitToCard();

        await curtain.animate(
          [{ transform: COVER }, { transform: END }],
          { duration: 650, easing: EASE, fill: "forwards" }
        ).finished;
      } finally {
        curtain.getAnimations().forEach((a) => a.cancel()); 
        overlay.style.display = "";
        overlay.style.pointerEvents = "";
        overlay.style.transform = "";
        onArrive.current = null;
        isBusy.current = false;
      }
    },
    [router, fitToCard]
  );

  return (
    <AuthTransitionContext.Provider value={go}>
      {children}

      <div
        ref={overlayRef}
        aria-hidden
        className="pointer-events-none fixed z-100 hidden overflow-hidden"
      >
        <div
          ref={curtainRef}
          className="absolute inset-y-0 left-0 will-change-transform"
          style={{ width: "160%", transform: START }}
        >
          <div
            className="absolute inset-y-0 left-0"
            style={{
              width: WAVE_W,
              clipPath: LEFT_EDGE,
              backgroundColor: PANEL_COLOR,
            }}
          />
          <div
            className="absolute inset-y-0"
            style={{
              left: `calc(${WAVE_W} - 1px)`,
              right: `calc(${WAVE_W} - 1px)`,
              backgroundColor: PANEL_COLOR,
            }}
          />
          <div
            className="absolute inset-y-0 right-0"
            style={{
              width: WAVE_W,
              clipPath: RIGHT_EDGE,
              backgroundColor: PANEL_COLOR,
            }}
          />
        </div>
      </div>
    </AuthTransitionContext.Provider>
  );
}
