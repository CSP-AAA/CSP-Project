import type { ReactNode } from "react";

import { Surface } from "@/components/ui/surface";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";



export function HomeSection({
  eyebrow,
  title,
  description,
  children,
  className,
  onDark = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <section className={cn("space-y-10", className)}>
      <div className="max-w-3xl space-y-4">
        <p
          className={cn(
            "flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em]",
            onDark ? "text-[var(--palette-teal-200)]" : "text-primary"
          )}
        >
        <Badge 
        className="h-auto px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em]">
          {eyebrow}
        </Badge>
        </p>
        <h2
          className={cn(
            "text-2xl font-semibold tracking-tight md:text-[2rem] md:leading-[1.2]",
            onDark && "text-white"
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "text-base leading-[1.7]",
              onDark ? "text-[var(--palette-teal-100)]" : "text-muted-foreground"
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

/** Full-width canvas fill. Content sits on Surface / Card inside the column. */
export function HomeBand({
  tone = "default",
  children,
}: {
  tone?: "default" | "paper" | "dark";
  children: ReactNode;
}) {
  return (
    <Surface
      tone="canvas"
      data-slot="page-band"
      className={cn(
        tone === "paper" && "story-paper",
        tone === "dark" && "bg-[var(--palette-teal-800)]",
        tone === "default" && "bg-background"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">{children}</div>
    </Surface>
  );
}

export function HomeRule() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6" aria-hidden>
      <hr className="border-0 border-t border-border" />
    </div>
  );
}