"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Confetti } from "@/components/confetti";
import { MusicToggle } from "@/components/music-toggle";
import { FloatingHearts } from "@/components/floating-hearts";
import { LandingSection } from "@/components/landing-section";
import { UnlockGate } from "@/components/unlock-gate";
import { MemoryTimeline, type Memory } from "@/components/memory-timeline";
import { PhotoGallery } from "@/components/photo-gallery";
import { GiftReveal } from "@/components/gift-reveal";
import { FinalLetter } from "@/components/final-letter";

// ============================================
// 🎀 CUSTOMIZE YOUR SURPRISE HERE! 🎀
// ============================================

// ชื่อแฟนของคุณ
const GIRLFRIEND_NAME = "Vaccine";

// รหัสผ่าน (วันครบรอบ เช่น "140223" สำหรับ 14 กุมภาพันธ์ 2023)
const UNLOCK_CODE = "251166";

// คำใบ้สำหรับรหัส
const CODE_HINT = "รหัสคือวันครบรอบของเรา (DDMMYY)";

// ข้อความของขวัญ (จะแสดงหลังเปิดกล่องของขวัญ)
const GIFT_MESSAGE =
  "ฉันจะพาเธอไปทานอาหารร้านที่เธอชอบ และมีของขวัญพิเศษรอเธออยู่!";

// ชื่อผู้ส่ง
const SENDER_NAME = "คนรักของเธอ";

// วันที่ในจดหมาย
const LETTER_DATE = "11 กุมภาพันธ์ 2569";

// จดหมายรัก (ใช้ \n เพื่อขึ้นบรรทัดใหม่)
const LOVE_LETTER = `ถึงคนที่รักที่สุด

ขอบคุณที่เข้ามาเป็นส่วนหนึ่งของชีวิต
ทุกวันที่มีเธออยู่ข้างๆ คือวันที่มีความหมาย

ขอบคุณที่รักกัน ขอบคุณที่เข้าใจ
ขอบคุณที่อยู่ด้วยกันในทุกช่วงเวลา

เธอคือคนที่ทำให้ฉันอยากเป็นคนดีขึ้น
อยากดูแลเธอไปตลอด

วันนี้เป็นวันพิเศษของเธอ
ขอให้เธอมีความสุขมากๆ นะ
รักเธอที่สุดเลย`;

// ความทรงจำ (เปลี่ยน image เป็น URL รูปภาพของคุณ)
const MEMORIES: Memory[] = [
  {
    id: 1,
    date: "8 กันยายน 2566",
    title: "เดทแรกของเรา",
    description: "เดทแรกที่สนามแบด",
    image: "/0.jpg",
    fullDescription: "ตีแบดวันนั้น เหนื่อยแค่ตัว…แต่รักเธอนี่เหนื่อยใจทุกวัน",
  },
  {
    id: 2,
    date: "25 พฤศจิกายน 2566",
    title: "วันที่ตกลงเป็นแฟนกัน",
    description: "วันที่เราตกลงปลงใจเป็นแฟนกัน",
    image: "/1.jpg",
    fullDescription:
      "วันที่เราตกลงปลงใจเป็นแฟนกัน ยังจำได้เลยว่าตื่นเต้นแค่ไหน ทุกอย่างมันเริ่มต้นจากวันนี้",
  },
  {
    id: 3,
    date: "10 เมษายน 2566",
    title: "ทริปแรกด้วยกัน",
    description: "ไปเที่ยวทะเลด้วยกันครั้งแรก",
    image: "/2.jpg",
    fullDescription: "ทริปพัทยาที่เราได้เห็นพระอาทิตย์ตกด้วยกัน โรแมนติกสุดๆ",
  },
  {
    id: 4,
    date: "4 ธันวาคม 2567",
    title: "ขับรถขึ้นดอย",
    description: "ขึ้นดอยด้วยกันครั้งแรก",
    image: "/3.jpg",
    fullDescription: "บางทริปไม่ได้พาเราไปไกล…แต่มันพาเราใกล้กันขึ้น",
  },
  {
    id: 5,
    date: "23 ตุลาคม 2568",
    title: "นั่งเครื่องลงใต้",
    description: "ทริปที่ทำให้เรารักความธรรมดา",
    image: "/4.jpg",
    fullDescription: "ทริปที่มีทั้งความรักของคนอื่น…และความรักของเรา",
  },
  {
    id: 6,
    date: "25 พฤศจิกายน 2568",
    title: "ครบรอบ 2 ปี",
    description: "ผ่านมา 731 วันแล้ว!",
    image: "/5.jpg",
    fullDescription:
      "ครบรอบปีที่สองของเรา ขอบคุณที่เป็นส่วนหนึ่งของชีวิตตลอดสองปีที่ผ่านมา รักเธอมากนะ",
  },
];

// รูปภาพสำหรับ Gallery (เพิ่มรูปได้ตามต้องการ)
const GALLERY_PHOTOS = [
  {
    id: 1,
    src: "gallery/Graduate.jpg",
    caption: "ถ่ายรูปรับปริญญา",
  },
  {
    id: 2,
    src: "gallery/ChinaTown.jpg",
    caption: "China Town",
  },
  {
    id: 3,
    src: "gallery/TTouch.jpg",
    caption: "T Touch Cafe",
  },
  {
    id: 4,
    src: "gallery/KohKred.jpg",
    caption: "เกาะเกร็ด",
  },
  {
    id: 5,
    src: "gallery/Temple.jpg",
    caption: "วัดเล่งเน่ยยี่ 2",
  },
  {
    id: 6,
    src: "gallery/BangkokSea.jpg",
    caption: "สวมสยาม",
  },
  {
    id: 7,
    src: "gallery/Valentine.jpg",
    caption: "Valentine's Day",
  },
  {
    id: 8,
    src: "gallery/OiPoi.jpg",
    caption: "โอ้ะปอย",
  },
  {
    id: 9,
    src: "gallery/Samui.jpg",
    caption: "สมุย",
  },

  {
    id: 10,
    src: "gallery/Ampwa.jpg",
    caption: "อัมพวา",
  },
  {
    id: 11,
    src: "gallery/Christmas.jpg",
    caption: "Christmas's Day",
  },
  {
    id: 12,
    src: "gallery/SevenKot.jpg",
    caption: "เดินป่าด้วยกัน",
  },
];

// ============================================

type Stage = "landing" | "unlock" | "timeline" | "gallery" | "gift" | "letter";

export default function BirthdaySurprise() {
  const [stage, setStage] = useState<Stage>("landing");
  const [showConfetti, setShowConfetti] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element for birthday music
    audioRef.current = new Audio("/hpbd.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const handleStartSurprise = () => {
    setShowConfetti(false);
    setStage("unlock");
  };

  const handleUnlock = () => {
    setStage("timeline");
  };

  const handleTimelineComplete = () => {
    setStage("gallery");
  };

  const handleGalleryComplete = () => {
    setStage("gift");
  };

  const handleGiftComplete = () => {
    setStage("letter");
  };

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <FloatingHearts />
      <MusicToggle isPlaying={isMusicPlaying} onToggle={toggleMusic} />
      <Confetti isActive={showConfetti && stage === "landing"} />

      <AnimatePresence mode="wait">
        {stage === "landing" && (
          <LandingSection
            key="landing"
            name={GIRLFRIEND_NAME}
            onStart={handleStartSurprise}
          />
        )}

        {stage === "unlock" && (
          <UnlockGate
            key="unlock"
            correctCode={UNLOCK_CODE}
            hint={CODE_HINT}
            onUnlock={handleUnlock}
          />
        )}

        {stage === "timeline" && (
          <MemoryTimeline
            key="timeline"
            memories={MEMORIES}
            onComplete={handleTimelineComplete}
          />
        )}

        {stage === "gallery" && (
          <PhotoGallery
            key="gallery"
            photos={GALLERY_PHOTOS}
            onContinue={handleGalleryComplete}
          />
        )}

        {stage === "gift" && (
          <GiftReveal
            key="gift"
            giftMessage={GIFT_MESSAGE}
            onComplete={handleGiftComplete}
          />
        )}

        {stage === "letter" && (
          <FinalLetter
            key="letter"
            letter={LOVE_LETTER}
            senderName={SENDER_NAME}
            date={LETTER_DATE}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
