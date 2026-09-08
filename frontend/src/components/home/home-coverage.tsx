"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, LinkSquare02Icon } from "@hugeicons/core-free-icons";

import { HomeSection } from "@/components/home/home-section";
import { useLocale } from "@/components/providers/locale-provider";
import { Surface } from "@/components/ui/surface";
import { AGENCIES } from "@/config/agencies";
import { listingsHref, routes } from "@/config/routes";

export function HomeCoverage() {
  const { locale, t } = useLocale();

  return (
    <HomeSection
      eyebrow={t("coverageEyebrow")}
      title={t("coverageTitle")}
      description={t("coverageBody")}
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {AGENCIES.map((agency) => {
          const source = agency.sources[0];
          return (
            <li key={agency.id}>
              <Surface
                asChild
                className="flex h-full flex-col gap-2 p-5 hover:ring-primary/40"
              >
              <Link href={listingsHref(agency.id)}>
                <span className="text-lg font-semibold tracking-tight">
                  {locale === "th" ? agency.shortTh : agency.shortEn}
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {locale === "th" ? agency.nameTh : agency.nameEn}
                </span>
                {source ? (
                  <span className="mt-auto pt-3 text-xs leading-relaxed text-muted-foreground">
                    {locale === "th" ? source.labelTh : source.labelEn}
                  </span>
                ) : null}
              </Link>
              </Surface>
            </li>
          );
        })}
      </ul>

      <Surface className="flex flex-wrap items-center justify-between gap-4 bg-[var(--palette-teal-50)] px-5 py-4 ring-0">
        <p className="flex items-center gap-2 text-sm text-[var(--palette-teal-900)]">
          <HugeiconsIcon icon={LinkSquare02Icon} strokeWidth={1.75} className="size-4" />
          {t("coverageTrust")}
        </p>
        <Link
          href={routes.tors}
          className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--palette-teal-900)] hover:underline"
        >
          {t("viewAllTors")}
          <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="size-3.5" />
        </Link>
      </Surface>
    </HomeSection>
  );
}
