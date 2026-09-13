import { motion } from "motion/react";

export type Flight = {
  /** Identidad única: fuerza un remount por vuelo (initial + onComplete fiables). */
  id: number;
  from: { x: number; y: number };
  to: { x: number; y: number };
  label: string;
  /** "value" = dato (píldora acento); "instruction" = línea de código. */
  kind: "value" | "instruction";
};

/**
 * Elemento que viaja entre actores durante una animación. Vive en un
 * overlay absoluto dentro del contenedor de la escena; las coordenadas
 * son los centros de origen y destino relativos a ese contenedor.
 */
export function FlyingToken({
  flight,
  onDone,
}: {
  flight: Flight;
  onDone: () => void;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute left-0 top-0 z-30"
      initial={{ x: flight.from.x, y: flight.from.y, opacity: 0 }}
      animate={{
        x: flight.to.x,
        y: flight.to.y,
        opacity: [0, 1, 1, 0],
        scale: [0.7, 1, 1, 0.8],
      }}
      transition={{ duration: 0.7, ease: "easeInOut", times: [0, 0.15, 0.85, 1] }}
      onAnimationComplete={onDone}
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border px-2 py-1 font-mono text-xs shadow-lg ${
          flight.kind === "value"
            ? "border-brand/50 bg-card text-brand"
            : "border-border bg-card text-foreground"
        }`}
      >
        {flight.label}
      </div>
    </motion.div>
  );
}
