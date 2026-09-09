import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Raised page layer. Sit this on the scroll canvas (or a HomeBand fill).
 * `canvas` is the field itself; `default` / `muted` are cards; `elevated`
 * and `frost` are glass (auth panel / hero).
 */
const surfaceVariants = cva(
  "rounded-xl ring-1 transition-colors",
  {
    variants: {
      tone: {
        canvas: "rounded-none bg-transparent ring-0",
        default:
          "bg-card text-card-foreground ring-foreground/10",
        muted: "bg-muted/40 text-foreground ring-transparent",
        elevated:
          "bg-surface-elevated text-card-foreground ring-border/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16)] backdrop-blur-md backdrop-saturate-150",
        frost:
          "bg-surface-frost text-inherit ring-[var(--surface-frost-ring)] shadow-[inset_0_1px_0_0_var(--surface-frost-highlight)] backdrop-blur-md backdrop-saturate-150",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  }
)

function Surface({
  className,
  tone = "default",
  asChild = false,
  as: Comp = "div",
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof surfaceVariants> & {
    asChild?: boolean
    as?: React.ElementType
  }) {
  const Root = asChild ? Slot.Root : Comp

  return (
    <Root
      data-slot="surface"
      data-tone={tone}
      className={cn(surfaceVariants({ tone }), className)}
      {...props}
    />
  )
}

export { Surface, surfaceVariants }
