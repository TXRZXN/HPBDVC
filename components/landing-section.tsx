"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingStars from "./flaoting-star";

interface LandingSectionProps {
  name: string;
  onStart: () => void;
}

export function LandingSection({ name, onStart }: LandingSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-center z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="text-6xl md:text-8xl mb-8"
        >
          🎂
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-primary text-lg md:text-xl tracking-widest uppercase mb-4 font-light"
        >
          Happy Birthday To My
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance"
        >
          {name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-muted-foreground text-lg md:text-xl mb-12 max-w-md mx-auto"
        >
          มีเซอร์ไพรส์พิเศษรอเธออยู่
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full group transition-all duration-300 hover:scale-105"
          >
            <Sparkles className="mr-2 h-5 w-5 group-hover:animate-pulse" />
            เริ่มเซอร์ไพรส์
          </Button>
        </motion.div>
      </motion.div>

      {/* Decorative stars */}
      <FloatingStars />
    </motion.section>
  );
}
