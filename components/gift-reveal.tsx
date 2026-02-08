"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface GiftRevealProps {
  giftMessage: string;
  onComplete: () => void;
}

export function GiftReveal({ giftMessage, onComplete }: GiftRevealProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleOpen = () => {
    setIsOpened(true);
    setTimeout(() => setShowMessage(true), 1500);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4"
    >
      {/* Background sparkles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${12 + Math.random() * 20}px`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ✦
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="gift-box"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="text-center z-10"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mb-8"
            >
              {/* Gift box */}
              <div className="relative w-40 h-40 mx-auto">
                {/* Box bottom */}
                <div className="absolute bottom-0 w-full h-24 bg-primary rounded-lg shadow-lg shadow-primary/30">
                  {/* Ribbon vertical */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-4 bg-foreground/90 transform -translate-x-1/2" />
                </div>
                {/* Box lid */}
                <motion.div
                  animate={{
                    rotateX: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-8 w-full h-10 bg-primary rounded-t-lg origin-bottom"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Ribbon horizontal */}
                  <div className="absolute top-1/2 left-0 right-0 h-4 bg-foreground/90 transform -translate-y-1/2" />
                  {/* Bow */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="relative">
                      <div className="w-6 h-6 bg-foreground/90 rounded-full absolute -left-6 top-1" />
                      <div className="w-6 h-6 bg-foreground/90 rounded-full absolute left-6 top-1" />
                      <div className="w-4 h-4 bg-foreground rounded-full relative z-10" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              มีของขวัญรอเธออยู่!
            </h2>
            <p className="text-muted-foreground mb-8">
              กดเพื่อเปิดของขวัญ
            </p>

            <Button
              onClick={handleOpen}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-lg rounded-full group transition-all duration-300 hover:scale-105"
            >
              <Gift className="mr-2 h-5 w-5" />
              เปิดของขวัญ
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="gift-opened"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center z-10"
          >
            {/* Explosion particles */}
            {!showMessage && (
              <>
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      x: 0,
                      y: 0,
                      scale: 1,
                      opacity: 1,
                    }}
                    animate={{
                      x: (Math.random() - 0.5) * 400,
                      y: (Math.random() - 0.5) * 400,
                      scale: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 1 + Math.random(),
                      ease: "easeOut",
                    }}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      width: 10 + Math.random() * 15,
                      height: 10 + Math.random() * 15,
                      backgroundColor:
                        i % 3 === 0
                          ? "rgb(212, 175, 55)"
                          : i % 3 === 1
                            ? "rgb(255, 215, 0)"
                            : "rgb(255, 248, 220)",
                      borderRadius: Math.random() > 0.5 ? "50%" : "0",
                    }}
                  />
                ))}
              </>
            )}

            {showMessage && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="text-6xl mb-6"
                >
                  🎁
                </motion.div>

                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    ของขวัญของเธอคือ...
                  </h2>
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl md:text-2xl text-primary font-semibold mb-8 max-w-md mx-auto"
                >
                  {giftMessage}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    onClick={onComplete}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105"
                  >
                    อ่านจดหมายจากใจ
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
