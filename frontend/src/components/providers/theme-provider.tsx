"use client";

import { useServerInsertedHTML } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "torrent-theme";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const listeners = new Set<() => void>();

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;
}

function readTheme(): Theme {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function emit() {
  listeners.forEach((listener) => listener());
}

export const THEME_BOOT_SCRIPT = `(function(){try{var t=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});var dark=t==="dark";document.documentElement.classList.toggle("dark",dark);document.documentElement.classList.toggle("light",!dark);document.documentElement.style.colorScheme=dark?"dark":"light";}catch(e){}})();`;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const inserted = useRef(false);
  useServerInsertedHTML(() => {
    if (inserted.current) return null;
    inserted.current = true;
    return (
      <script
        id="theme-boot"
        dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }}
      />
    );
  });

  const theme = useSyncExternalStore(subscribe, readTheme, () => "light");

  const setTheme = useCallback((next: Theme) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
    emit();
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme }),
    [theme, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
