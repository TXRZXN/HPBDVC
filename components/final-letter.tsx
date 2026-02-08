"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface FinalLetterProps {
  letter: string;
  senderName: string;
  date: string;
}

export function FinalLetter({ letter, senderName, date }: FinalLetterProps) {
  const letterLines = letter.split("\n");

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center py-12 px-4 relative"
    >
      {/* Background hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${20 + Math.random() * 40}px`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-xl w-full z-10"
      >
        {/* Letter paper */}
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 shadow-2xl shadow-primary/10 relative overflow-hidden">
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-primary/10 rounded-tr-full" />

          {/* Heart icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="flex justify-center mb-6"
          >
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-primary fill-primary" />
            </div>
          </motion.div>

          {/* Letter content */}
          <div className="space-y-4 text-foreground/90">
            {letterLines.map((line, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="leading-relaxed text-center"
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 + letterLines.length * 0.1 + 0.3 }}
            className="mt-10 text-center"
          >
            <p className="text-primary text-xl font-semibold italic">
              ด้วยรักทั้งหมดจากใจ,
            </p>
            <p className="text-2xl font-bold text-foreground mt-2">
              {senderName}
            </p>
            <p className="text-muted-foreground text-sm mt-2">{date}</p>
          </motion.div>

          {/* Bottom hearts decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex justify-center gap-1 mt-8 text-primary/50"
          >
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                ♥
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Footer message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center text-muted-foreground text-sm mt-8"
        >
          สร้างด้วยความรักจากใจจริงๆ ♥
        </motion.p>
      </motion.div>
    </motion.section>
  );
}
