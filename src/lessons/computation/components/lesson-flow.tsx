"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IntroHistory } from "./intro-history";
import { HardwareDiagram } from "./hardware-diagram";
import { Scene } from "./scene";

const CHAPTERS = ["Historia", "La máquina", "En acción"];

/**
 * Orquesta los capítulos de la lección con transición animada entre
 * ellos. Se puede volver a capítulos ya visitados desde la cabecera.
 */
export function LessonFlow({ html }: { html: string }) {
  const [chapter, setChapter] = useState(0);
  const [maxVisited, setMaxVisited] = useState(0);

  function go(target: number) {
    setChapter(target);
    setMaxVisited((m) => Math.max(m, target));
  }

  return (
    <div className="flex flex-col gap-8">
      <nav aria-label="Capítulos" className="flex items-center gap-1 font-mono text-xs">
        {CHAPTERS.map((label, i) => (
          <button
            key={label}
            type="button"
            disabled={i > maxVisited}
            onClick={() => go(i)}
            className={`rounded-md px-3 py-1.5 transition-colors ${
              i === chapter
                ? "bg-secondary text-foreground"
                : i <= maxVisited
                  ? "text-muted-foreground hover:text-foreground"
                  : "cursor-not-allowed text-muted-foreground/40"
            }`}
          >
            {String(i + 1).padStart(2, "0")} {label}
          </button>
        ))}
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={chapter}
          initial={{ opacity: 0, scale: 0.985, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.02, y: -8 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          {chapter === 0 && <IntroHistory onNext={() => go(1)} />}
          {chapter === 1 && <HardwareDiagram onDone={() => go(2)} />}
          {chapter === 2 && <Scene html={html} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
