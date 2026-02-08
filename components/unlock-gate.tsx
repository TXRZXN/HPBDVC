"use client";

import React from "react"

import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface UnlockGateProps {
  correctCode: string;
  hint: string;
  onUnlock: () => void;
}

export function UnlockGate({ correctCode, hint, onUnlock }: UnlockGateProps) {
  const [code, setCode] = useState("");
  const [isWrong, setIsWrong] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === correctCode) {
      setIsUnlocked(true);
      setTimeout(onUnlock, 1500);
    } else {
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 500);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center z-10 max-w-md w-full"
      >
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <motion.div
                animate={isWrong ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <div className="w-24 h-24 mx-auto bg-card border-2 border-primary/30 rounded-full flex items-center justify-center mb-6">
                  <Lock className="w-10 h-10 text-primary" />
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  ไขรหัสเพื่อเปิดความทรงจำ
                </h2>

                <p className="text-muted-foreground mb-2">
                  ใส่รหัสลับเพื่อดูเซอร์ไพรส์
                </p>

                <p className="text-primary/80 text-sm italic mb-8">
                  💡 คำใบ้: {hint}
                </p>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="ใส่รหัสที่นี่..."
                  className={`text-center text-2xl py-6 bg-card border-2 ${
                    isWrong
                      ? "border-destructive animate-pulse"
                      : "border-primary/30 focus:border-primary"
                  } transition-colors`}
                  autoFocus
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg rounded-full transition-all duration-300 hover:scale-105"
                >
                  ปลดล็อค
                </Button>
              </form>

              {isWrong && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-destructive mt-4"
                >
                  รหัสไม่ถูกต้อง ลองอีกครั้งนะ
                </motion.p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="w-24 h-24 mx-auto bg-primary/20 border-2 border-primary rounded-full flex items-center justify-center mb-6"
              >
                <Unlock className="w-10 h-10 text-primary" />
              </motion.div>

              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                ถูกต้อง! 🎉
              </h2>

              <p className="text-muted-foreground">
                กำลังเปิดความทรงจำของเรา...
              </p>

              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="mt-6"
              >
                <Heart className="w-8 h-8 text-primary mx-auto" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}
