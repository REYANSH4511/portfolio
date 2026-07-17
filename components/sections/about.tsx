"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { fadeInUp } from "@/components/motion-variants";

export function About() {
  return (
    <section id="about" className="border-b border-border/50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="space-y-6"
        >
          <p className="font-mono text-xs text-accent">{"// 01 ABOUT"}</p>
          <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
            Engineering systems that scale.
          </h2>
          <div className="max-w-3xl space-y-4 text-base leading-relaxed text-muted">
            <p>{profile.summary}</p>
            <p>
              My work sits at the intersection of distributed backends, cloud
              infrastructure, and practical AI — building platforms that are
              fast, observable, and reliable under real production load.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
