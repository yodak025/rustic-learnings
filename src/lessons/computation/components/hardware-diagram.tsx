"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import {
  ArrowRight,
  Cable,
  ChevronLeft,
  Cpu as CpuIcon,
  HardDrive,
  Headphones,
  Keyboard,
  MemoryStick,
  Mic,
  Monitor,
  Mouse,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ---------------------------------------------------------------- datos */

const PERIPHERALS: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "disk", label: "Disco", icon: HardDrive },
  { id: "keyboard", label: "Teclado", icon: Keyboard },
  { id: "mouse", label: "Ratón", icon: Mouse },
  { id: "monitor", label: "Monitor", icon: Monitor },
  { id: "network", label: "Cable de red", icon: Cable },
  { id: "mic", label: "Micrófono", icon: Mic },
  { id: "headphones", label: "Auriculares", icon: Headphones },
];

const CORE: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "cpu", label: "CPU", icon: CpuIcon },
  { id: "ram", label: "RAM", icon: MemoryStick },
  { id: "gpu", label: "GPU", icon: CpuIcon },
];

type SceneText = {
  title: string;
  body: string;
  aside?: string;
};

const SCENES: SceneText[] = [
  {
    title: "El ordenador por dentro",
    body:
      "En el centro vive el núcleo: procesador, memoria RAM y GPU. Todo lo " +
      "demás — disco incluido — son periféricos: maneras de meter o sacar " +
      "información del núcleo. Se pueden desenchufar y la máquina sigue " +
      "sabiendo pensar.",
  },
  {
    title: "El núcleo, de cerca",
    body:
      "La CPU ejecuta instrucciones, una detrás de otra, muy rápido. La RAM " +
      "es su memoria de trabajo: lo que la CPU necesita ahora mismo, a mano. " +
      "Ese par es la máquina de Turing del capítulo anterior: reglas y cinta.",
  },
  {
    title: "RAM y disco no son lo mismo",
    body:
      "La RAM es la mesa de trabajo: rapidísima, pero se vacía al apagar. El " +
      "disco es el archivador: mucho más lento, pero lo que se guarda " +
      "permanece. Por eso el disco vive entre los periféricos: lejos del " +
      "núcleo, y se le habla con paciencia.",
  },
  {
    title: "¿Y la GPU?",
    body:
      "Es un procesador especial: hace lo mismo que la CPU, pero en manada — " +
      "miles de operaciones sencillas a la vez. Ideal para vídeo, gráficos y, " +
      "últimamente, inteligencia artificial.",
    aside:
      "Simplificación honesta: en el resto de la lección asumimos que todo el " +
      "procesado lo hace la CPU. Pero cuando alguien diga «GPU», ya sabes qué es.",
  },
];

/* ------------------------------------------------------------ subpiezas */

function ComponentCard({
  id,
  label,
  icon: Icon,
  size,
  dimmed = false,
  highlighted = false,
}: {
  id: string;
  label: string;
  icon: LucideIcon;
  size: "sm" | "lg";
  dimmed?: boolean;
  highlighted?: boolean;
}) {
  return (
    <motion.div
      layoutId={`hw-${id}`}
      layout
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`flex items-center rounded-xl border bg-card shadow-sm transition-colors ${
        size === "sm" ? "gap-2 px-3 py-2" : "gap-3 px-5 py-4"
      } ${
        highlighted
          ? "border-brand/60 ring-2 ring-brand/20"
          : dimmed
            ? "border-border opacity-40"
            : "border-border"
      }`}
    >
      <Icon className={size === "sm" ? "size-4 text-brand" : "size-6 text-brand"} />
      <span className={`font-mono ${size === "sm" ? "text-xs" : "text-sm"}`}>
        {label}
      </span>
    </motion.div>
  );
}

/** Vista 1: el núcleo en el centro, los periféricos en anillo. */
function OverviewLayout() {
  return (
    <div className="relative h-[430px]">
      {/* Núcleo */}
      <motion.div
        layoutId="hw-core"
        className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-2xl border-2 border-brand/50 bg-secondary/60 p-4"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-brand">
          núcleo
        </span>
        <div className="flex flex-col gap-2">
          {CORE.map((c) => (
            <ComponentCard key={c.id} {...c} size="sm" />
          ))}
        </div>
      </motion.div>

      {/* Periféricos en anillo */}
      {PERIPHERALS.map((p, i) => {
        const angle = (i / PERIPHERALS.length) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + 40 * Math.cos(angle);
        const y = 50 + 40 * Math.sin(angle);
        return (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ delay: 0.08 * i, duration: 0.3 }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <ComponentCard {...p} size="sm" dimmed={p.id !== "disk"} />
          </motion.div>
        );
      })}

      {/* Leyenda */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-4 font-mono text-[10px] text-muted-foreground"
      >
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-brand" /> núcleo
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-border" /> periféricos
        </span>
      </motion.div>
    </div>
  );
}

/** Vistas 2-4: zoom al núcleo; en la escena de RAM vs disco aparece el disco. */
function FocusLayout({ scene }: { scene: number }) {
  const highlight = (id: string) =>
    (scene === 1 && (id === "cpu" || id === "ram")) ||
    (scene === 2 && (id === "ram" || id === "disk")) ||
    (scene === 3 && id === "gpu");
  const dim = (id: string) => !highlight(id);

  return (
    <div className="flex h-[430px] flex-col items-center justify-center gap-4">
      {CORE.map((c) => (
        <ComponentCard
          key={c.id}
          {...c}
          size="lg"
          highlighted={highlight(c.id)}
          dimmed={dim(c.id)}
        />
      ))}
      <AnimatePresence>
        {scene === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              …y desde los periféricos
            </span>
            <ComponentCard
              id="disk"
              label="Disco"
              icon={HardDrive}
              size="lg"
              highlighted
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------- capítulo */

/**
 * Capítulo 2 — diagrama animado de las partes del ordenador, en escenas:
 * visión general → núcleo → RAM vs disco → GPU. El morphing entre vistas
 * lo resuelven los layoutId compartidos.
 */
export function HardwareDiagram({ onDone }: { onDone: () => void }) {
  const [scene, setScene] = useState(0);
  const text = SCENES[scene];
  const last = scene === SCENES.length - 1;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
      <div className="rounded-2xl border border-border bg-[radial-gradient(circle,var(--color-border)_1px,transparent_1px)] p-4 [background-size:18px_18px]">
        <LayoutGroup>
          {scene === 0 ? <OverviewLayout /> : <FocusLayout scene={scene} />}
        </LayoutGroup>
      </div>

      <div className="flex flex-col justify-center gap-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={scene}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-4"
          >
            <h2 className="text-xl font-semibold tracking-tight">{text.title}</h2>
            <p className="leading-relaxed text-muted-foreground">{text.body}</p>
            {text.aside && (
              <p className="rounded-lg border border-brand/30 bg-secondary/50 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                {text.aside}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            aria-label="Escena anterior"
            disabled={scene === 0}
            onClick={() => setScene((s) => s - 1)}
          >
            <ChevronLeft className="size-4" />
          </Button>
          {last ? (
            <Button onClick={onDone}>
              Ver la máquina en acción
              <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button onClick={() => setScene((s) => s + 1)}>Siguiente</Button>
          )}
          <span className="ml-auto font-mono text-xs text-muted-foreground">
            {scene + 1}/{SCENES.length}
          </span>
        </div>
      </div>
    </div>
  );
}
