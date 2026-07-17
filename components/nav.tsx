"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight text-fg hover:text-accent transition-colors"
        >
          reyansh.dev
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 font-mono text-xs text-muted hover:text-fg hover:bg-elevated transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/resume"
            download
            className="nav-resume hidden sm:inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs text-muted transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            Resume
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted hover:text-fg hover:bg-elevated transition-colors"
          >
            <Sun className="hidden h-4 w-4 dark:block" />
            <Moon className="h-4 w-4 dark:hidden" />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
            className="inline-flex md:hidden h-9 w-9 items-center justify-center rounded-md text-muted hover:text-fg hover:bg-elevated transition-colors"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-200 ease-in-out",
          mobileOpen ? "max-h-96 border-b border-border/50" : "max-h-0"
        )}
      >
        <nav className="flex flex-col px-4 py-2 space-y-1 bg-bg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-2 font-mono text-sm text-muted hover:text-fg hover:bg-elevated transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/resume"
            download
            className="mt-2 inline-flex items-center gap-2 rounded-md px-3 py-2 font-mono text-sm text-muted hover:text-fg hover:bg-elevated transition-colors"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
