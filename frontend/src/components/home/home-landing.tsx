"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

import { HomeCapabilities } from "@/components/home/home-capabilities";
import { HomeCoverage } from "@/components/home/home-coverage";
import { HomeCta } from "@/components/home/home-cta";
import { HomeRoles } from "@/components/home/home-roles";
import { HomeBand } from "@/components/home/home-section";
import { HomeTrust } from "@/components/home/home-trust";
import { HomeWorkflow } from "@/components/home/home-workflow";
import { BrandLockup } from "@/components/layout/brand-lockup";
import { useLocale } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";
import { routes } from "@/config/routes";

export function HomeLanding() {
  const { t } = useLocale();

  return (
    <div>
      <section className="relative -mt-[72px] overflow-hidden hero-atmosphere text-hero-foreground">
        <div className="pointer-events-none absolute inset-0 hero-rays opacity-60" />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-[calc(72px+4rem)] sm:px-6 md:pb-24 md:pt-[calc(72px+6rem)]">
          <BrandLockup size="lg" priority />

          <Surface tone="frost" className="mt-10 max-w-3xl p-6 md:p-8">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-hero-muted">
              {t("homeEyebrow")}
            </p>
            <h1 className="mt-4 whitespace-pre-line text-3xl font-semibold tracking-tight md:text-5xl md:leading-[1.1]">
              {t("homeTitle")}
            </h1>
            <p className="mt-5 text-base leading-[1.7] text-hero-muted md:text-lg">
              {t("homeDescription")}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={routes.tors}>
                  {t("browseTors")}
                  <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="chrome">
                <Link href={routes.monitor}>{t("openMonitor")}</Link>
              </Button>
            </div>
          </Surface>
        </div>
        <div aria-hidden className="bma-stripes h-1 opacity-70" />
      </section>

      <HomeBand>
        <HomeCoverage />
      </HomeBand>
      <HomeBand tone="paper">
        <HomeCapabilities />
      </HomeBand>
      <HomeBand>
        <HomeRoles />
      </HomeBand>
      <HomeBand tone="paper">
        <HomeWorkflow />
      </HomeBand>
      <HomeBand>
        <HomeTrust />
      </HomeBand>
      <HomeBand tone="dark">
        <HomeCta />
      </HomeBand>
    </div>
  );
}
