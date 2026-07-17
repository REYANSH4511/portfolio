import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";

const About = dynamic(
  () => import("@/components/sections/about").then((m) => m.About),
  { ssr: true }
);
const Experience = dynamic(
  () => import("@/components/sections/experience").then((m) => m.Experience),
  { ssr: true }
);
const Projects = dynamic(
  () => import("@/components/sections/projects").then((m) => m.Projects),
  { ssr: true }
);
const Skills = dynamic(
  () => import("@/components/sections/skills").then((m) => m.Skills),
  { ssr: true }
);
const Education = dynamic(
  () => import("@/components/sections/education").then((m) => m.Education),
  { ssr: true }
);
const Contact = dynamic(
  () => import("@/components/sections/contact").then((m) => m.Contact),
  { ssr: true }
);

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Contact />
    </>
  );
}
