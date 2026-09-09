"use client";

import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  Database01Icon,
  Notification01Icon,
  SparklesIcon,
  Task01Icon,
} from "@hugeicons/core-free-icons";

import { HomeSection } from "@/components/home/home-section";
import { useLocale } from "@/components/providers/locale-provider";
import { FrostCard } from "@/components/ui/frost-card";
import { Surface } from "@/components/ui/surface";
import type { DictionaryKey } from "@/lib/i18n/dictionary";

const STAGES = [
  {
    title: "workflowCollectTitle",
    body: "workflowCollectBody",
    icon: Database01Icon,
    iconBg: "bg-[var(--palette-blue-75)]",
    iconFg: "text-[var(--palette-blue-800)]",
  },
  {
    title: "workflowClassifyTitle",
    body: "workflowClassifyBody",
    icon: SparklesIcon,
    iconBg: "bg-[var(--palette-purple-75)]",
    iconFg: "text-[var(--palette-purple-700)]",
  },
  {
    title: "workflowEnrichTitle",
    body: "workflowEnrichBody",
    icon: Task01Icon,
    iconBg: "bg-[var(--palette-teal-75)]",
    iconFg: "text-[var(--palette-teal-700)]",
  },
  {
    title: "workflowDeliverTitle",
    body: "workflowDeliverBody",
    icon: Notification01Icon,
    iconBg: "bg-[var(--palette-orange-75)]",
    iconFg: "text-[var(--palette-orange-700)]",
  },
] as const satisfies {
  title: DictionaryKey;
  body: DictionaryKey;
  icon: IconSvgElement;
  iconBg: string;
  iconFg: string;
}[];

export function HomeWorkflow() {
  const { t } = useLocale();

  return (
    <HomeSection
      eyebrow={t("workflowEyebrow")}
      title={t("workflowTitle")}
      description={t("workflowSubtitle")}
    >
      <Surface className="space-y-4 bg-surface p-5 ring-transparent md:p-6">
        <ol className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {STAGES.map((stage, index) => (
            <FrostCard
              as="li"
              key={stage.title}
              className="flex h-full flex-col gap-3 rounded-lg p-6 md:p-5"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-[8px] ${stage.iconBg}`}
                >
                  <HugeiconsIcon
                    icon={stage.icon}
                    strokeWidth={2}
                    className={`size-5 ${stage.iconFg}`}
                  />
                </span>
                <h3 className="min-w-0 flex-1 text-xl font-semibold tracking-tight">
                  {t(stage.title)}
                </h3>
                <span className="font-heading text-sm tabular-nums text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="text-sm leading-[1.7] text-muted-foreground">
                {t(stage.body)}
              </p>
            </FrostCard>
          ))}
        </ol>
      </Surface>
    </HomeSection>
  );
}
