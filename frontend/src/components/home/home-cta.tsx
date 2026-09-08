"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

import { useLocale } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";
import { routes } from "@/config/routes";

export function HomeCta() {
  const { t } = useLocale();

  return (
    <Surface
      as="section"
      tone="frost"
      className="flex flex-col gap-6 p-6 md:flex-row md:items-end md:justify-between md:p-8"
    >
      <div className="max-w-2xl space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-[2rem] md:leading-[1.2]">
          {t("ctaTitle")}
        </h2>
        <p className="text-base leading-[1.7] text-[var(--palette-teal-100)]">
          {t("ctaBody")}
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link href={routes.tors}>
            {t("browseTors")}
            <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
          </Link>
        </Button>
        <Button asChild size="lg" variant="chrome">
          <Link href={routes.register}>{t("ctaVendorProfile")}</Link>
        </Button>
      </div>
    </Surface>
  );
}
