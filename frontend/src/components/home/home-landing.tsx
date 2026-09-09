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
import { HomeRule } from "@/components/home/home-section";
import { BrandLockup } from "@/components/layout/brand-lockup";
import { useLocale } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { FrostCard } from "@/components/ui/frost-card";
import { routes } from "@/config/routes";

export function HomeLanding() {
  const { t } = useLocale();

  return (
    <div>
      <section className="relative -mt-[144px] overflow-hidden hero-atmosphere text-hero-foreground">
        <div className="pointer-events-none absolute inset-0 hero-rays opacity-70" />
        <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-[calc(72px+4rem)] sm:px-6 md:pb-12 md:pt-[calc(72px+6rem)]">
          <BrandLockup size="xxxxl" priority />
          <FrostCard className="mt-2 max-w-3xl">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-hero-muted">
              {t("homeEyebrow")}
            </p>
            <h1 className="mt-4 whitespace-pre-line text-3xl font-semibold tracking-tight md:text-5xl md:leading-[1.1]">
              {t("homeTitle")}
            </h1>
            <p className="mt-5 text-base leading-[1.7] text-hero-muted md:text-lg">
              {t("homeDescription")}
            </p>
          </FrostCard>
          <div className="pt-2 mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="orange">
                <Link href={routes.tors}>
                  {t("browseTors")}
                  <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={routes.monitor}>{t("openMonitor")}</Link>
              </Button>
          </div>
        </div>
        <div aria-hidden className="bma-stripes h-1 opacity-70" />
      </section>

      <HomeBand>
      <div className="pt-8 md:pt-12">
        <HomeCoverage />
      </div>
      </HomeBand>
      <HomeRule />
      <HomeBand>
        <HomeCapabilities />
      </HomeBand>
      <HomeRule />
      <HomeBand>
        <HomeRoles />
      </HomeBand>
      <HomeRule />
      <HomeBand>
        <HomeWorkflow />
      </HomeBand>
      <HomeRule />
      <HomeBand>
        <HomeTrust />
      </HomeBand>
      <HomeRule />
      <HomeBand>
        <HomeCta />
      </HomeBand>
    </div>
  );
}
