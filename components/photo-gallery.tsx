"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Heart } from "lucide-react";

interface Photo {
  id: number;
  src: string;
  caption: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  onContinue: () => void;
}

export function PhotoGallery({ photos, onContinue }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const openPhoto = (index: number) => {
    setSelectedPhoto(index);
  };

  const closePhoto = () => {
    setSelectedPhoto(null);
  };

  const nextPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto + 1) % photos.length);
    }
  };

  const prevPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto - 1 + photos.length) % photos.length);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-primary fill-primary" />
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
              ความทรงจำของเรา
            </h2>
            <Heart className="w-6 h-6 text-primary fill-primary" />
          </div>
          <p className="text-muted-foreground text-lg">
            ทุกช่วงเวลาที่มีเธอ คือความสุขที่สุด
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer 
                         bg-card border border-border shadow-sm
                         hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              onClick={() => openPhoto(index)}
            >
              <Image
                src={photo.src || "/placeholder.svg"}
                alt={photo.caption}
                fill
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-sm font-medium line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className="w-5 h-5 text-white fill-primary drop-shadow-md" />
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button
            onClick={onContinue}
            size="lg"
            className="px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl 
                       hover:scale-105 transition-all duration-300"
          >
            ไปรับของขวัญกันเลย
            <Heart className="w-5 h-5 ml-2 fill-current" />
          </Button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closePhoto}
        >
          <button
            onClick={closePhoto}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white 
                       transition-colors p-2 rounded-full bg-white/10 hover:bg-white/20"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white 
                       transition-colors p-2 rounded-full bg-white/10 hover:bg-white/20"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div
            className="max-w-4xl max-h-[85vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[70vh]">
              <Image
                src={photos[selectedPhoto].src || "/placeholder.svg"}
                alt={photos[selectedPhoto].caption}
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-white text-lg font-medium">
                {photos[selectedPhoto].caption}
              </p>
              <p className="text-white/60 text-sm mt-1">
                {selectedPhoto + 1} / {photos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
