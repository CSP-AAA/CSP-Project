import * as React from "react"

import { Surface } from "@/components/ui/surface"
import { cn } from "@/lib/utils"

/**
 * Frosted glass panel. Sit it on a photographed or tinted field
 * (hero, dark band) so the blur has chroma to sample.
 */
function FrostCard({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Surface>, "tone">) {
  return (
    <Surface
      tone="frost"
      data-slot="frost-card"
      className={cn("p-6 md:p-8", className)}
      {...props}
    />
  )
}

export { FrostCard }
