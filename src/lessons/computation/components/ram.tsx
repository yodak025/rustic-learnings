import type { RefObject } from "react";
import { motion } from "motion/react";

export const RAM_COLS = 8;
export const RAM_ROWS = 4;
export const RAM_CELLS = RAM_COLS * RAM_ROWS;

type Cell = { char: string; valueIndex: number } | null;

/**
 * Distribuye los valores en celdas de un carácter, con una celda vacía
 * de separación entre valores. Los valores largos se cortan donde caiga
 * el final de fila: eso es deliberado — así se ve que la memoria son
 * casillas, no cajas con nombre.
 */
export function computeCells(values: string[]): {
  cells: Cell[];
  starts: number[];
  nextIndex: number;
} {
  const cells: Cell[] = [];
  const starts: number[] = [];

  values.forEach((value, valueIndex) => {
    if (valueIndex > 0) cells.push(null); // separador
    starts.push(cells.length);
    for (const char of value) cells.push({ char, valueIndex });
  });

  const nextIndex = cells.length === 0 ? 0 : cells.length + 1;
  while (cells.length < RAM_CELLS) cells.push(null);

  return { cells: cells.slice(0, RAM_CELLS), starts, nextIndex };
}

/** Tonos que ciclan por valor para que sigan siendo distinguibles al cortarse. */
const tones = ["text-brand", "text-success", "text-foreground"];

/**
 * La RAM como cuadrícula de celdas de un carácter. Se escribe texto —
 * abstracción asumida; la nota sobre binario llega al final de la lección.
 */
export function Ram({
  values,
  animateValueIndex,
  containerRef,
}: {
  values: string[];
  /** Índice del valor recién escrito: sus caracteres entran animados. */
  animateValueIndex?: number;
  containerRef?: RefObject<HTMLDivElement | null>;
}) {
  const { cells } = computeCells(values);
  let animCharOffset = 0;

  return (
    <section className="flex flex-col gap-3">
      <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Memoria RAM
      </h3>
      <div
        ref={containerRef}
        className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-2">
          <span className="font-mono text-xs text-muted-foreground">
            celdas de memoria
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            {cells.filter(Boolean).length}/{RAM_CELLS}
          </span>
        </div>

        <div
          className="grid gap-px bg-border/60 p-px"
          style={{ gridTemplateColumns: `repeat(${RAM_COLS}, minmax(0, 1fr))` }}
        >
          {cells.map((cell, i) => {
            const isNew = cell !== null && cell.valueIndex === animateValueIndex;
            const delay = isNew ? animCharOffset++ * 0.05 : 0;
            return (
              <div
                key={i}
                data-cell={i}
                className="flex aspect-square items-center justify-center bg-card font-mono text-sm"
              >
                {cell === null ? (
                  <span className="text-border/80">·</span>
                ) : isNew ? (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay, duration: 0.25 }}
                    className={tones[cell.valueIndex % tones.length]}
                  >
                    {cell.char === " " ? "␣" : cell.char}
                  </motion.span>
                ) : (
                  <span className={tones[cell.valueIndex % tones.length]}>
                    {cell.char === " " ? "␣" : cell.char}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
