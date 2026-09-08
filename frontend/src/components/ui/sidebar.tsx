"use client";

import * as React from "react";
import { Slot } from "radix-ui";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export const SIDEBAR_WIDTH = "220px";
export const SIDEBAR_WIDTH_MOBILE = "18rem";

type SidebarContextValue = {
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

function SidebarProvider({
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  const toggleSidebar = React.useCallback(() => {
    setOpenMobile((value) => !value);
  }, []);

  const value = React.useMemo<SidebarContextValue>(
    () => ({
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
    }),
    [openMobile, isMobile, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={value}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            ...style,
          } as React.CSSProperties
        }
        className={cn("group/sidebar-wrapper flex w-full", className)}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

function Sidebar({
  side = "left",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right";
}) {
  const { isMobile, openMobile, setOpenMobile } = useSidebar();

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          data-slot="sidebar"
          data-mobile="true"
          side={side}
          showCloseButton={false}
          className="w-(--sidebar-width) gap-0 border-sidebar-border bg-sidebar p-0 text-sidebar-foreground backdrop-blur-xl backdrop-saturate-150"
          style={
            { "--sidebar-width": SIDEBAR_WIDTH_MOBILE } as React.CSSProperties
          }
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
            <SheetDescription>TORRENT sections and shortcuts.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className="hidden h-full text-sidebar-foreground md:block"
      data-slot="sidebar"
      data-side={side}
    >
      <div
        data-slot="sidebar-gap"
        className="relative h-full w-(--sidebar-width) bg-transparent"
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          "absolute inset-y-0 z-20 hidden h-full w-(--sidebar-width) md:flex",
          side === "left" ? "left-0" : "right-0",
          className
        )}
        {...props}
      >
        <div className="flex h-full w-full flex-col overflow-hidden border-r border-sidebar-border bg-sidebar pt-[72px]">
          {children}
        </div>
      </div>
    </div>
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn("flex shrink-0 flex-col gap-2 p-3", className)}
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-4 md:pt-0",
        className
      )}
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn(
        "flex w-full shrink-0 flex-col gap-2 border-t border-sidebar-divider p-4",
        className
      )}
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      className={cn(
        "relative flex w-full min-w-0 flex-col gap-2 not-first:pt-2",
        className
      )}
      {...props}
    />
  );
}

function SidebarGroupLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-label"
      className={cn(
        "flex shrink-0 items-center px-3 pt-5 pb-1 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-sidebar-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  );
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  );
}

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
  isActive?: boolean;
}) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="sidebar-menu-button"
      data-active={isActive}
      className={cn(
        "flex h-10 w-full items-center gap-3 overflow-hidden rounded-full px-3 text-left text-sm text-sidebar-foreground outline-none ring-1 ring-transparent transition-all",
        "hover:bg-[color-mix(in_srgb,var(--palette-teal-400)_22%,transparent)] hover:text-sidebar-accent-foreground hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] hover:ring-[color-mix(in_srgb,var(--palette-teal-300)_35%,transparent)] hover:backdrop-blur-md",
        "focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        "data-[active=true]:bg-[color-mix(in_srgb,var(--palette-teal-400)_32%,transparent)] data-[active=true]:font-medium data-[active=true]:text-[var(--palette-teal-50)] data-[active=true]:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.28)] data-[active=true]:ring-[color-mix(in_srgb,var(--palette-teal-300)_45%,transparent)] data-[active=true]:backdrop-blur-md data-[active=true]:backdrop-saturate-150",
        "[&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        className
      )}
      {...(asChild ? {} : { type: "button" as const })}
      {...props}
    />
  );
}

/** Scroll canvas that carries page content, flush with the sidebar. */
function MainContent({
  className,
  contentClassName,
  children,
  ...props
}: React.ComponentProps<"div"> & { contentClassName?: string }) {
  return (
    <div
      data-slot="main-content-gutter"
      className={cn(
        "flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-transparent",
        className
      )}
      {...props}
    >
      <main
        data-slot="main-content-canvas"
        className={cn(
          "h-full min-h-0 flex-1 overflow-x-hidden overflow-y-auto bg-background pt-[72px]",
          contentClassName
        )}
      >
        {children}
      </main>
    </div>
  );
}

export {
  MainContent,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
};
