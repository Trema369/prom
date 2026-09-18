"use client";

import { useMemo } from "react";
import { motion } from "motion/react";

type BubbleConfig = {
  id: number;
  src: string;
  size: number;
  x: number;
  y: number;
  delay: number;
};

const BOY = "/images/IMG-20260905-WA0003.jpg";
const GIRL = "/images/IMG-20260905-WA0004.jpg";
const PROM = "/images/IMG-20260908-WA0015.jpg";

/* ── Gate layout ──────────────────────────────────────────────────────
   Desktop: two large circles, diagonal, pinned top-right.
   Mobile:  smaller bubbles so they don't dominate the screen. */

const GATE_LARGE: BubbleConfig[] = [
  { id: 0, src: BOY,  size: 180, x: 68, y: 6,  delay: 0   },
  { id: 1, src: GIRL, size: 160, x: 80, y: 28, delay: 0.4 },
];

const GATE_SMALL: BubbleConfig[] = [
  { id: 0, src: BOY,  size: 72, x: 70, y: 5,  delay: 0   },
  { id: 1, src: GIRL, size: 64, x: 78, y: 30, delay: 0.3 },
];

/* ── Other screens (yes only — no page has none) ──────────────────── */

const POSITIONS: { x: number; y: number; size: number }[] = [
  { x: 8,  y: 12, size: 100 },
  { x: 82, y: 18, size: 90  },
  { x: 15, y: 70, size: 80  },
  { x: 78, y: 72, size: 85  },
  { x: 50, y: 6,  size: 75  },
  { x: 88, y: 45, size: 70  },
  { x: 5,  y: 42, size: 75  },
];

function makeScattered(includeProm: boolean): BubbleConfig[] {
  const images = includeProm
    ? [BOY, GIRL, PROM, BOY, GIRL, PROM, GIRL]
    : [BOY, GIRL, BOY, GIRL, BOY, GIRL, BOY];

  const count = includeProm ? 7 : 5;

  return POSITIONS.slice(0, count).map((pos, i) => ({
    id: i,
    src: images[i % images.length],
    size: pos.size,
    x: pos.x,
    y: pos.y,
    delay: i * 0.25,
  }));
}

type Props = {
  variant?: "gate" | "default";
  includeProm?: boolean;
};

export default function FloatingBubbles({ variant = "default", includeProm = false }: Props) {
  const scattered = useMemo(() => makeScattered(includeProm), [includeProm]);

  if (variant === "gate") {
    return (
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-[1]">
        <div className="hidden sm:block">
          {GATE_LARGE.map((b) => (
            <Bubble key={b.id} b={b} />
          ))}
        </div>
        <div className="block sm:hidden">
          {GATE_SMALL.map((b) => (
            <Bubble key={b.id} b={b} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-[1]">
      {scattered.map((b) => (
        <Bubble key={b.id} b={b} />
      ))}
    </div>
  );
}

function Bubble({ b }: { b: BubbleConfig }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: b.delay, duration: 1.2, ease: "easeOut" }}
      className="absolute"
      style={{
        left: `${b.x}%`,
        top: `${b.y}%`,
        width: b.size,
        height: b.size,
      }}
    >
      <div className="h-full w-full rounded-full overflow-hidden border-2 border-cream/20 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]">
        <img
          src={b.src}
          alt=""
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>
    </motion.div>
  );
}
