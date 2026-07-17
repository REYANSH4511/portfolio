import { Variants } from "framer-motion";

// Opacity is intentionally left at 1 in both hidden/visible states so that
// content is always readable even if the IntersectionObserver / whileInView
// trigger fails on a cold light-mode load. The reveal is carried by the
// subtle y translation instead.
export const fadeInUp: Variants = {
  hidden: { opacity: 1, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};
