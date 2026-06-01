"use client";
import { motion, useReducedMotion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function FadeIn({ children, delay = 0, className }: Props) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: shouldReduce ? 0.2 : 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

export function FadeInStagger({
  children,
  className,
  staggerDelay = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: shouldReduce ? 0 : staggerDelay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function FadeInItem({ children, className }: { children: React.ReactNode; className?: string }) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: shouldReduce ? 0 : 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function SlideInLeft({ children, delay = 0, className }: Props) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: shouldReduce ? 0 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: shouldReduce ? 0.2 : 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SlideInRight({ children, delay = 0, className }: Props) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: shouldReduce ? 0 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: shouldReduce ? 0.2 : 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, delay = 0, className }: Props) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: shouldReduce ? 0.2 : 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
