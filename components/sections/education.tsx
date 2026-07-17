"use client";

import { motion } from "framer-motion";
import { education, certifications, languages } from "@/data/profile";
import { fadeInUp, staggerContainer } from "@/components/motion-variants";

export function Education() {
  return (
    <section id="education" className="border-b border-border/50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid gap-10 lg:grid-cols-2"
        >
          <motion.div variants={fadeInUp} className="space-y-6">
            <p className="font-mono text-xs text-accent">{"// 05 EDUCATION"}</p>
            {education.map((item) => (
              <div
                key={item.degree}
                className="rounded-xl border border-border bg-elevated p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-fg">
                  {item.degree}
                </h3>
                <p className="text-sm text-accent">
                  {item.institution} | {item.period}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.note}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-6">
            <p className="font-mono text-xs text-accent">
              {"// CERTIFICATIONS & LANGUAGES"}
            </p>
            <div className="rounded-xl border border-border bg-elevated p-6 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold text-fg">
                Certifications
              </h3>
              <ul className="list-disc space-y-2 pl-4 text-sm text-muted marker:text-accent">
                {certifications.map((cert, i) => (
                  <li key={i}>{cert}</li>
                ))}
              </ul>

              <h3 className="mb-3 mt-8 text-sm font-semibold text-fg">
                Languages
              </h3>
              <div className="flex flex-wrap gap-3">
                {languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="skill-tag rounded-md px-3 py-1.5"
                  >
                    <span className="text-sm text-fg">{lang.name}</span>
                    <span className="ml-2 text-xs text-muted">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
