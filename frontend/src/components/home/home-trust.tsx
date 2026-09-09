"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";

import { HomeSection } from "@/components/home/home-section";
import { useLocale } from "@/components/providers/locale-provider";
import { FrostCard } from "@/components/ui/frost-card";
import { Surface } from "@/components/ui/surface";
import type { DictionaryKey } from "@/lib/i18n/dictionary";

const COMMITMENTS: DictionaryKey[] = [
  "trustSource",
  "trustFlags",
  "trustNoBidding",
  "trustAdvisory",
  "trustAwarded",
];

export function HomeTrust() {
  const { t } = useLocale();

  return (
    <HomeSection
      eyebrow={t("trustEyebrow")}
      title={t("trustTitle")}
      description={t("trustSubtitle")}
    >
      <Surface className="space-y-4 bg-surface p-5 ring-transparent md:p-6">
        <ul className="grid gap-5 md:grid-cols-2">
          {COMMITMENTS.map((commitment) => (
            <FrostCard
              as="li"
              key={commitment}
              className="flex items-start gap-3 rounded-lg p-6 md:p-5"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-[8px] bg-[var(--palette-teal-75)]">
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  strokeWidth={2}
                  className="size-5 text-[var(--palette-teal-700)]"
                />
              </span>
              <p className="pt-2 text-sm leading-[1.7]">{t(commitment)}</p>
            </FrostCard>
          ))}
        </ul>
      </Surface>
    </HomeSection>
  );
}
