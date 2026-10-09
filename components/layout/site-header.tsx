"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { CommandPaletteTrigger } from "@/components/command/command-palette";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <ScrollProgress />
      <header
      className={cn(
        "no-print fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-border-subtle bg-void/75 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[var(--header-height)] max-w-6xl items-center justify-between px-4 sm:px-6 md:px-8">
        <Link
          href="/"
          className="rounded-[var(--radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Prince Pandey home"
        >
          <Logo showWordmark className="hidden sm:inline-flex" size="sm" />
          <Logo showWordmark={false} className="sm:hidden" size="sm" />
        </Link>

        <nav
          className="hidden items-center gap-0.5 xl:flex"
          aria-label="Primary"
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-[var(--radius-sm)] px-2.5 py-2 text-sm transition-colors",
                isActive(item.href)
                  ? "text-text-primary"
                  : "text-text-secondary hover:text-text-primary",
              )}
            >
              {item.label}
              {isActive(item.href) ? (
                <span className="mt-1 block h-px w-full bg-accent" aria-hidden />
              ) : (
                <span className="mt-1 block h-px w-full bg-transparent" aria-hidden />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CommandPaletteTrigger className="hidden lg:inline-flex" />
          <ThemeToggle className="hidden sm:inline-flex" />
          <div className="hidden items-center gap-3 lg:flex">
            <span className="hidden items-center gap-2 text-xs text-text-muted 2xl:flex">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              {siteConfig.availability.label}
            </span>
            <Button asChild size="sm" className="hidden xl:inline-flex">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-border-default text-text-primary xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-void/60 backdrop-blur-sm xl:hidden"
            />
            <motion.div
              id="mobile-nav"
              initial={reduced ? false : { opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-4 top-[calc(var(--header-height)+0.5rem)] z-50 origin-top rounded-[var(--radius-xl)] border border-border-default bg-surface-1 shadow-[var(--shadow-lg)] xl:hidden"
            >
              <nav
                className="flex max-h-[70vh] flex-col gap-1 overflow-y-auto px-3 py-4"
                aria-label="Mobile"
              >
                {[...siteConfig.nav, ...siteConfig.secondaryNav].map(
                  (item, i) => (
                    <motion.span
                      key={item.href}
                      initial={reduced ? false : { opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.28,
                        delay: reduced ? 0 : 0.06 + i * 0.045,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="block"
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-[var(--radius-md)] px-4 py-3 text-base",
                          isActive(item.href)
                            ? "bg-surface-2 text-text-primary"
                            : "text-text-secondary",
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.span>
                  ),
                )}
                <div className="mt-3 flex items-center gap-2 px-4 sm:hidden">
                  <ThemeToggle />
                  <span className="text-xs text-text-muted">Theme</span>
                </div>
                <motion.span
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.28,
                    delay: reduced ? 0 : 0.06 + 10 * 0.045,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mt-3 block px-1"
                >
                  <Button asChild className="w-full">
                    <Link href="/contact">Get in touch</Link>
                  </Button>
                </motion.span>
              </nav>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
      </header>
    </>
  );
}
