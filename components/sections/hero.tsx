"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDown, Download } from "lucide-react";
import { profile, achievements } from "@/data/profile";
import { ServiceMap } from "@/components/service-map";
import { TypingTerminal } from "@/components/typing-terminal";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-border/50"
    >
      <div className="hero-grid absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-10 sm:px-6 sm:pt-24 sm:pb-12 lg:px-8 lg:pt-32 lg:pb-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 font-mono text-xs text-success"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
              </span>
              SYSTEM ONLINE — 99.9% UPTIME
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="space-y-4"
            >
              <h1 className="break-words text-4xl font-semibold leading-[0.95] tracking-tight text-fg sm:text-5xl md:text-6xl lg:text-7xl">
                Hi, I&apos;m{" "}
                <span className="bg-linear-to-r from-accent via-accent to-success bg-clip-text text-transparent">
                  {profile.name}
                </span>
              </h1>
              <p className="text-xl text-accent sm:text-2xl">
                {profile.title}
              </p>
              <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                {profile.summary}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="/resume"
                download
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-sm font-medium text-white hover:bg-accent-dim transition-colors"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
              <Link
                href="#contact"
                className="btn-secondary inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-sm font-medium transition-colors"
              >
                Get in Touch
                <ArrowDown className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <ServiceMap />
          </motion.div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
          >
            <TypingTerminal />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3"
          >
            {achievements.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-border/50 bg-elevated p-4"
              >
                <p className="font-mono text-2xl font-semibold text-accent">
                  {item.value}
                </p>
                <p className="mt-1 text-xs font-medium text-fg">{item.label}</p>
                <p className="mt-0.5 text-xs text-muted">{item.detail}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
