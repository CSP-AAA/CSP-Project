import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Frosted label chip. Tint comes from `currentColor` like the Button,
 * but there is no rim, inset highlight, or hover lift — it should not
 * read as a control even when it sits inside a link.
 */
const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 cursor-default items-center justify-center gap-1 overflow-hidden rounded-full border-0 bg-[color-mix(in_srgb,currentColor_16%,transparent)] px-2 py-0.5 text-[0.625rem] font-medium whitespace-nowrap shadow-none ring-0 backdrop-blur-md backdrop-saturate-150 transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/30 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:text-destructive [&>svg]:pointer-events-none [&>svg]:size-2.5!",
  {
    variants: {
      variant: {
        default: "text-primary",
        secondary: "text-secondary-foreground",
        destructive: "text-destructive",
        outline: "text-foreground",
        ghost: "bg-transparent text-foreground backdrop-blur-none",
        link: "bg-transparent text-primary backdrop-blur-none underline-offset-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
