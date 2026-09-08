"use client";

import Image from "next/image";

import { useLocale } from "@/components/providers/locale-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

const SIZE = {
  sm: { className: "h-7 w-auto md:h-9", width: 180, height: 40 },
  md: { className: "h-10 w-auto", width: 220, height: 48 },
  lg: { className: "h-12 w-auto md:h-14", width: 320, height: 72 },
  xl: { className: "h-14 w-auto md:h-20", width: 400, height: 90 },
} as const;

/**
 * Official ThaiTORRENT lockup from /public.
 * `logo_dark` is light-on-dark; `logo_light` is dark-on-light.
 * `onDark` forces the light-on-dark mark (app bar / sidebar chrome).
 */
export function BrandLockup({
  className,
  size = "sm",
  priority = false,
  onDark = false,
}: {
  className?: string;
  size?: keyof typeof SIZE;
  priority?: boolean;
  onDark?: boolean;
}) {
  const { t } = useLocale();
  const { theme } = useTheme();
  const dim = SIZE[size];
  const darkLockup = onDark || theme === "dark";

  return (
    <Image
      src={darkLockup ? "/logo_dark.png" : "/logo_light.png"}
      alt={t("brand")}
      width={dim.width}
      height={dim.height}
      className={cn(dim.className, className)}
      priority={priority}
    />
  );
}
