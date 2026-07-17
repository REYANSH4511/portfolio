"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/profile";
import { fadeInUp, staggerContainer } from "@/components/motion-variants";

function ProjectCard({
  project,
  featured = false,
}: {
  project: (typeof projects)[0];
  featured?: boolean;
}) {
  return (
    <motion.article
      variants={fadeInUp}
      className={`group surface-polish flex flex-col rounded-xl border border-border bg-elevated/90 p-5 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg ${
        featured ? "sm:col-span-2 lg:col-span-2" : ""
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="break-words text-base font-semibold text-fg transition-colors group-hover:text-accent">
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              aria-label={`Visit ${project.name}`}
            >
              {project.name}
            </a>
          ) : (
            project.name
          )}
        </h3>
        <span className="skill-tag shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] text-muted">
          {project.role}
        </span>
      </div>

      <div className="space-y-2 text-sm text-muted">
        <p>
          <span className="text-fg">Problem:</span> {project.problem}
        </p>
        <p>
          <span className="text-fg">Solution:</span> {project.solution}
        </p>
        {featured && project.detail && (
          <p className="text-muted">{project.detail}</p>
        )}
        <p>
          <span className="text-success">Result:</span> {project.result}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 pt-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="skill-tag rounded-md px-2 py-1 font-mono text-[10px] text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="section-optimize border-b border-border/50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-10"
        >
          <motion.div variants={fadeInUp} className="space-y-2">
            <p className="font-mono text-xs text-accent">{"// 03 PROJECTS"}</p>
            <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
              Systems I&apos;ve designed end-to-end.
            </h2>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ProjectCard project={featured} featured />
            {rest.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
