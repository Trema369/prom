"use client";

import { useState } from "react";
import { motion } from "motion/react";
import HeartDivider from "./HeartDivider";
import EvasiveButton from "./EvasiveButton";

type Props = {
  onYes: () => void;
  onNo: () => void;
  onBack: () => void;
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Ask({ onYes, onNo, onBack }: Props) {
  const [busy, setBusy] = useState(false);

  function yes() {
    if (busy) return;
    setBusy(true);
    onYes();
  }

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="w-full max-w-lg text-center"
    >
      <motion.h1 variants={item} className="font-serif text-6xl text-cream drop-shadow-md sm:text-7xl">
        Harley,
      </motion.h1>

      <motion.div variants={item}>
        <HeartDivider />
      </motion.div>

      <motion.p variants={item} className="text-xl text-cream/90 drop-shadow-sm sm:text-2xl">
        I just wanted to ask you
        <br />
        <span className="font-serif text-3xl italic text-rose sm:text-4xl">a special question.</span>
      </motion.p>

      <motion.p variants={item} className="mx-auto mt-5 max-w-xs text-sm leading-relaxed text-cream/70 drop-shadow-sm sm:text-base">
        When you&rsquo;re ready, take your time and answer whenever you&rsquo;ve decided.
      </motion.p>

      <motion.div variants={item}>
        <HeartDivider variant="plain" />
      </motion.div>

      <motion.h2 variants={item} className="font-serif text-4xl leading-snug text-cream drop-shadow-md sm:text-5xl">
        Will you be my
        <br />
        date to <span className="accent text-5xl sm:text-6xl">prom?</span>
      </motion.h2>

      <motion.div variants={item}>
        <HeartDivider />
      </motion.div>

      <motion.div
        variants={item}
        className="mt-2 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center"
      >
        <button
          type="button"
          onClick={yes}
          disabled={busy}
          className="rounded-xl bg-crimson px-8 py-4 text-base font-semibold text-cream shadow-glow transition hover:bg-crimson-deep disabled:opacity-60 sm:min-w-[210px]"
        >
          Yes, of course&nbsp;&#9825;
        </button>

        <div className="sm:min-w-[190px]">
          <EvasiveButton onRegister={onNo} />
        </div>
      </motion.div>

      <motion.p variants={item} className="mx-auto mt-4 max-w-sm text-[11px] leading-relaxed text-cream/45">
        If you want to say no, just be patient with the button and think about your decision&nbsp;&#9825;
      </motion.p>

      <motion.button
        variants={item}
        type="button"
        onClick={onBack}
        className="mt-8 inline-flex items-center gap-1.5 text-xs text-cream/30 transition hover:text-cream/55"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        back
      </motion.button>
    </motion.div>
  );
}
