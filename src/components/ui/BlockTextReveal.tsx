"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface BlockTextRevealProps {
  children: React.ReactNode;
  className?: string;
  blockColor?: string;
  textColor?: string;
  delay?: number;
}

export default function BlockTextReveal({
  children,
  className = "",
  blockColor = "var(--color-brand-green)",
  textColor,
  delay = 0,
}: BlockTextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className={`relative inline-block overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 z-20"
        style={{ backgroundColor: blockColor, originX: 0 }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: [0, 1, 1, 0], originX: [0, 0, 1, 1] } : {}}
        transition={{
          duration: 1.2,
          ease: [0.77, 0.02, 0.24, 1.02],
          times: [0, 0.4, 0.6, 1], // scale in takes 40%, holds for 20%, scales out for 40%
          delay: delay,
        }}
      />
      <motion.div
        className="relative z-10"
        style={{ color: textColor }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.01, delay: delay + 0.48 }} // appears right when block is fully covering
      >
        {children}
      </motion.div>
    </div>
  );
}
