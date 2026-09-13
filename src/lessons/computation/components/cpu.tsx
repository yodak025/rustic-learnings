import type { ReactNode, RefObject } from "react";
import { AnimatePresence, motion } from "motion/react";

const PINS_PER_SIDE = 6;

function PinRow({ side }: { side: "top" | "bottom" | "left" | "right" }) {
  const horizontal = side === "top" || side === "bottom";
  const position = {
    top: "-top-1.5 left-0 right-0 flex-row justify-center",
    bottom: "-bottom-1.5 left-0 right-0 flex-row justify-center",
    left: "-left-1.5 top-0 bottom-0 flex-col justify-center",
    right: "-right-1.5 top-0 bottom-0 flex-col justify-center",
  }[side];

  return (
    <div className={`absolute flex gap-3 ${position}`} aria-hidden>
      {Array.from({ length: PINS_PER_SIDE }).map((_, i) => (
        <span
          key={i}
          className={`rounded-sm bg-border ${horizontal ? "h-1.5 w-1" : "h-1 w-1.5"}`}
        />
      ))}
    </div>
  );
}

/**
 * El procesador como chip. `display` es su única "pantalla": muestra la
 * instrucción u operación en curso. La CPU no almacena — lo que entra,
 * sale transformado.
 */
export function Cpu({
  display,
  status,
  displayRef,
  children,
}: {
  display: string | null;
  status: string;
  displayRef?: RefObject<HTMLDivElement | null>;
  children?: ReactNode;
}) {
  return (
    <section className="relative flex flex-col gap-3">
      <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Procesador
      </h3>
      {children}
      <div className="flex items-center justify-center rounded-xl border border-border bg-secondary/50 px-8 py-10">
        <div className="relative">
          <PinRow side="top" />
          <PinRow side="bottom" />
          <PinRow side="left" />
          <PinRow side="right" />
          <div className="flex w-64 flex-col items-center justify-center gap-2 rounded-lg border-2 border-border bg-card px-4 py-5 shadow-sm">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              cpu
            </span>
            <div
              ref={displayRef}
              className="flex h-10 w-full items-center justify-center overflow-hidden rounded-md border border-border bg-secondary px-2"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={display ?? "idle"}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.3 }}
                  transition={{ duration: 0.2 }}
                  className={`truncate font-mono text-sm ${
                    display ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {display ?? "—"}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="text-[10px] text-muted-foreground">{status}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
