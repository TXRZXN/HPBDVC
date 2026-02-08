"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";

export interface Memory {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string;
  fullDescription?: string;
}

interface MemoryTimelineProps {
  memories: Memory[];
  onComplete: () => void;
}

export function MemoryTimeline({ memories, onComplete }: MemoryTimelineProps) {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-12 px-4 relative"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          เรื่องราวของเรา
        </h2>
        <p className="text-muted-foreground">
          ความทรงจำที่เราสร้างร่วมกัน
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="max-w-2xl mx-auto relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 transform md:-translate-x-1/2" />

        {/* Memory cards */}
        <div className="space-y-8">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`relative flex items-center ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 z-10 shadow-lg shadow-primary/30" />

              {/* Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedMemory(memory)}
                className={`ml-10 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                } cursor-pointer`}
              >
                <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={memory.image || "/placeholder.svg"}
                      alt={memory.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                    <span className="absolute bottom-3 left-3 text-xs text-primary font-medium bg-card/80 px-2 py-1 rounded-full">
                      {memory.date}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {memory.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {memory.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: memories.length * 0.2 + 0.5 }}
          className="text-center mt-12"
        >
          <Button
            onClick={onComplete}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full group transition-all duration-300 hover:scale-105"
          >
            ไปต่อเลย
            <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
          </Button>
        </motion.div>
      </div>

      {/* Memory popup */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-2xl overflow-hidden max-w-lg w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-80">
                <Image
                  src={selectedMemory.image || "/placeholder.svg"}
                  alt={selectedMemory.title}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setSelectedMemory(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-colors"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>
              <div className="p-6">
                <span className="text-primary text-sm font-medium">
                  {selectedMemory.date}
                </span>
                <h3 className="text-2xl font-bold text-foreground mt-1 mb-3">
                  {selectedMemory.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedMemory.fullDescription || selectedMemory.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
