"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";

import { useLocale } from "@/components/providers/locale-provider";
import { useTheme, type Theme } from "@/components/providers/theme-provider";
import { Toggle } from "@/components/ui/toggle";

export function ThemeToggle({
  className,
  tone,
}: {
  className?: string;
  tone?: "default" | "chrome";
}) {
  const { t } = useLocale();
  const { theme, setTheme } = useTheme();

  return (
    <Toggle
      aria-label={t("themeToggle")}
      value={theme}
      onValueChange={(value: Theme) => setTheme(value)}
      options={[
        {
          value: "light",
          label: <HugeiconsIcon icon={Sun03Icon} strokeWidth={1.75} className="size-3.5" />,
          ariaLabel: t("themeLight"),
        },
        {
          value: "dark",
          label: <HugeiconsIcon icon={Moon02Icon} strokeWidth={1.75} className="size-3.5" />,
          ariaLabel: t("themeDark"),
        },
      ]}
      className={className}
      tone={tone}
    />
  );
}
