"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/profile";
import { fadeInUp, staggerContainer } from "@/components/motion-variants";
import {
  Code,
  Layout,
  Server,
  Database,
  Sparkles,
  Cloud,
  Share2,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";

const skillGroups = [
  { key: "languages", label: "Languages", icon: Code, tint: "indigo" },
  { key: "frontend", label: "Frontend", icon: Layout, tint: "violet" },
  { key: "backend", label: "Backend & APIs", icon: Server, tint: "blue" },
  { key: "databases", label: "Databases", icon: Database, tint: "cyan" },
  { key: "ai", label: "AI Engineering", icon: Sparkles, tint: "green" },
  { key: "cloud", label: "Cloud & DevOps", icon: Cloud, tint: "slate" },
  { key: "messaging", label: "Messaging & Integration", icon: Share2, tint: "teal" },
  { key: "testing", label: "Testing & Security", icon: ShieldCheck, tint: "orange" },
  { key: "tools", label: "Tools & Methods", icon: Wrench, tint: "zinc" },
] as const;

const tintClasses: Record<
  string,
  { border: string; icon: string; label: string; bg: string }
> = {
  indigo: {
    border: "border-indigo-500/20 dark:border-indigo-500/20",
    icon: "text-indigo-700 dark:text-indigo-400",
    label: "text-indigo-700 dark:text-indigo-400",
    bg: "skill-icon-tint--indigo",
  },
  violet: {
    border: "border-violet-500/20 dark:border-violet-500/20",
    icon: "text-violet-700 dark:text-violet-400",
    label: "text-violet-700 dark:text-violet-400",
    bg: "skill-icon-tint--violet",
  },
  blue: {
    border: "border-blue-500/20 dark:border-blue-500/20",
    icon: "text-blue-700 dark:text-blue-400",
    label: "text-blue-700 dark:text-blue-400",
    bg: "skill-icon-tint--blue",
  },
  cyan: {
    border: "border-cyan-500/20 dark:border-cyan-500/20",
    icon: "text-cyan-700 dark:text-cyan-400",
    label: "text-cyan-700 dark:text-cyan-400",
    bg: "skill-icon-tint--cyan",
  },
  green: {
    border: "border-green-500/20 dark:border-success/30",
    icon: "text-green-700 dark:text-success",
    label: "text-green-700 dark:text-success",
    bg: "skill-icon-tint--green",
  },
  slate: {
    border: "border-slate-500/20 dark:border-slate-500/20",
    icon: "text-slate-700 dark:text-slate-400",
    label: "text-slate-700 dark:text-slate-400",
    bg: "skill-icon-tint--slate",
  },
  teal: {
    border: "border-teal-500/20 dark:border-teal-500/20",
    icon: "text-teal-700 dark:text-teal-400",
    label: "text-teal-700 dark:text-teal-400",
    bg: "skill-icon-tint--teal",
  },
  orange: {
    border: "border-orange-500/20 dark:border-orange-500/20",
    icon: "text-orange-700 dark:text-orange-400",
    label: "text-orange-700 dark:text-orange-400",
    bg: "skill-icon-tint--orange",
  },
  zinc: {
    border: "border-zinc-500/20 dark:border-zinc-500/20",
    icon: "text-zinc-700 dark:text-zinc-400",
    label: "text-zinc-700 dark:text-zinc-400",
    bg: "skill-icon-tint--zinc",
  },
};

export function Skills() {
  return (
    <section id="skills" className="section-optimize border-b border-border/50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-10"
        >
          <motion.div variants={fadeInUp} className="space-y-2">
            <p className="font-mono text-xs text-accent">{"// 04 SKILLS"}</p>
            <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
              Technologies I work with.
            </h2>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => {
              const items = skills[group.key as keyof typeof skills];
              const tint = tintClasses[group.tint];
              const Icon = group.icon;
              return (
                <motion.div
                  key={group.key}
                  variants={fadeInUp}
                  className={cn(
                    "group surface-polish rounded-xl border bg-elevated/90 p-5 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg",
                    tint.border
                  )}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span className={cn("skill-icon-tint transition-all duration-200 group-hover:scale-110 group-hover:shadow-[0_0_16px_rgba(124,156,255,0.25)]", tint.bg)}>
                      <Icon className={cn("h-4 w-4", tint.icon)} />
                    </span>
                    <h3 className={cn("font-mono text-xs font-semibold uppercase tracking-wider", tint.label)}>
                      {group.label}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                          key={item}
                          className="skill-tag rounded-md px-2.5 py-1 font-mono text-xs text-muted"
                        >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
