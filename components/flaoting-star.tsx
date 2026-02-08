"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Star = {
  top: number;
  left: number;
  duration: number;
  delay: number;
};

export default function FloatingStars() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 5 }).map(() => ({
      top: 20 + Math.random() * 60,
      left: 10 + Math.random() * 80,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 2,
    }));

    setStars(generated);
  }, []);

  // สำคัญมาก: SSR phase จะ render null
  if (stars.length === 0) return null;

  return (
    <>
      {stars.map((s, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/30 text-2xl"
          style={{ top: `${s.top}%`, left: `${s.left}%` }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
          }}
        >
          ✦
        </motion.div>
      ))}
    </>
  );
}
