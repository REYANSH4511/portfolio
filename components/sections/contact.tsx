"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { Download } from "lucide-react";
import {
  LinkedInBrandIcon,
  GithubBrandIcon,
  MailBrandIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { fadeInUp, staggerContainer } from "@/components/motion-variants";

export function Contact() {
  return (
    <section id="contact" className="border-b border-border/50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col items-center text-center"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 font-mono text-xs text-success"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
            </span>
            OPEN TO OPPORTUNITIES
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="mt-6 text-3xl font-semibold tracking-tight text-fg sm:text-4xl"
          >
            Let&apos;s build something reliable.
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-4 max-w-2xl text-base text-muted"
          >
            Open to senior full-stack, backend, and AI-platform engineering
            roles. Reach out directly or grab the resume below.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-5"
          >
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="rounded-full p-2 text-muted transition-all duration-200 hover:scale-110 hover:text-accent hover:shadow-[0_0_20px_rgba(124,156,255,0.25)]"
            >
              <MailBrandIcon className="h-7 w-7" />
            </a>
            <a
              href={`https://wa.me/${profile.phone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="rounded-full p-2 text-muted transition-all duration-200 hover:scale-110 hover:text-success hover:shadow-[0_0_20px_rgba(61,220,151,0.25)]"
            >
              <WhatsAppIcon className="h-7 w-7" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-full p-2 text-muted transition-all duration-200 hover:scale-110 hover:text-[#0A66C2] hover:shadow-[0_0_20px_rgba(10,102,194,0.25)] dark:text-muted"
            >
              <LinkedInBrandIcon className="h-7 w-7" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded-full p-2 text-muted transition-all duration-200 hover:scale-110 hover:text-fg hover:shadow-[0_0_20px_rgba(124,156,255,0.2)] dark:text-muted"
            >
              <GithubBrandIcon className="h-7 w-7" />
            </a>
            <a
              href="/resume"
              download
              aria-label="Download Resume"
              className="rounded-full p-2 text-muted transition-all duration-200 hover:scale-110 hover:text-accent hover:shadow-[0_0_20px_rgba(124,156,255,0.25)]"
            >
              <Download className="h-7 w-7" />
            </a>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-6 flex flex-col gap-1 font-mono text-sm text-muted"
          >
            <p>{profile.email}</p>
            <p>{profile.phone}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
