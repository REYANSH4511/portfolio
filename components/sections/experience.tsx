"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/profile";
import { DelveInsightIcon, SpanideaIcon } from "@/components/icons";
import { fadeInUp, staggerContainer } from "@/components/motion-variants";

function companyInitials(company: string) {
  return company
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function Experience() {
  return (
    <section id="experience" className="border-b border-border/50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-10"
        >
          <motion.div variants={fadeInUp} className="space-y-2">
            <p className="font-mono text-xs text-accent">{"// 02 EXPERIENCE"}</p>
            <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
              Where I&apos;ve shipped production systems.
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical rail */}
            <div className="absolute left-4 top-2 bottom-2 w-px bg-border sm:left-6" />

            <div className="space-y-10">
              {experience.map((job) => (
                <motion.article
                  key={job.id}
                  variants={fadeInUp}
                  className="relative grid grid-cols-1 gap-4 pl-12 sm:grid-cols-[140px_1fr] sm:pl-16"
                >
                  {/* Connector dot */}
                  <div className="absolute left-2.5 top-2 h-3 w-3 rounded-full border-2 border-accent bg-bg sm:left-4.5" />

                  {/* Date anchored to the rail */}
                  <p className="font-mono text-xs text-muted whitespace-nowrap sm:text-right">
                    {job.start} – {job.end}
                  </p>

                  <div>
                    <div className="flex items-start gap-3">
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${job.company} website`}
                        className={`inline-flex shrink-0 items-center justify-center rounded-lg border border-border bg-elevated/80 text-fg backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/5 hover:shadow-md ${
                          job.id === "delveinsight" || job.id === "spanidea"
                            ? "h-10 px-4"
                            : "h-10 w-10 font-mono text-xs font-semibold"
                        }`}
                      >
                        {job.id === "delveinsight" ? (
                          <DelveInsightIcon className="h-6 w-auto" />
                        ) : job.id === "spanidea" ? (
                          <SpanideaIcon className="h-5 w-auto" />
                        ) : (
                          companyInitials(job.company)
                        )}
                      </a>
                      <div className="min-w-0">
                        <h3 className="break-words text-lg font-semibold text-fg">
                          {job.role}
                        </h3>
                        <p className="break-words text-sm text-accent">
                          {job.company} — {job.location}
                        </p>
                      </div>
                    </div>
                    <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-muted marker:text-accent">
                      {job.bullets.map((bullet, j) => (
                        <li key={j}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
