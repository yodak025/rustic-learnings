"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import { OUTPUT } from "../program";
import { INITIAL_HINT, SNAPSHOTS, STEPS, type CalloutTarget } from "../steps";
import { Callout } from "./callout";
import { CodePanel } from "./code-panel";
import { Controls } from "./controls";
import { Cpu } from "./cpu";
import { FlyingToken, type Flight } from "./flying-token";
import { OutputModal } from "./output-modal";
import { Ram, computeCells } from "./ram";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Point = { x: number; y: number };

export function Scene({ html }: { html: string }) {
  const reduceMotion = useReducedMotion();

  const sceneRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const cpuDisplayRef = useRef<HTMLDivElement>(null);
  const ramRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [ram, setRam] = useState<string[]>([]);
  const [animateValueIndex, setAnimateValueIndex] = useState<number>();
  const [cpuDisplay, setCpuDisplay] = useState<string | null>(null);
  const [cpuStatus, setCpuStatus] = useState("en reposo");
  const [flight, setFlight] = useState<Flight | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [callout, setCallout] = useState<{
    target: CalloutTarget;
    text: string;
  } | null>({ target: "code", text: INITIAL_HINT });

  const flightDone = useRef<(() => void) | null>(null);
  const flightId = useRef(0);
  const flightGuard = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---------- utilidades de coordenadas ---------- */

  const centerOf = useCallback((el: Element): Point => {
    const scene = sceneRef.current!.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return {
      x: r.left + r.width / 2 - scene.left,
      y: r.top + r.height / 2 - scene.top,
    };
  }, []);

  const lineEl = useCallback((line: number) => {
    return codeRef.current?.querySelectorAll<HTMLElement>(".line")[line - 1] ?? null;
  }, []);

  const cellEl = useCallback((index: number) => {
    return ramRef.current?.querySelector<HTMLElement>(`[data-cell="${index}"]`) ?? null;
  }, []);

  const onFlightDone = useCallback(() => {
    if (flightGuard.current) {
      clearTimeout(flightGuard.current);
      flightGuard.current = null;
    }
    setFlight(null);
    flightDone.current?.();
    flightDone.current = null;
  }, []);

  const fly = useCallback(
    (from: Element | null, to: Element | null, label: string, kind: Flight["kind"]) => {
      if (reduceMotion || !from || !to || !sceneRef.current) return Promise.resolve();
      return new Promise<void>((resolve) => {
        flightDone.current = resolve;
        setFlight({
          id: ++flightId.current,
          from: centerOf(from),
          to: centerOf(to),
          label,
          kind,
        });
        // Cinturón de seguridad: la lección nunca se queda colgada
        // aunque una animación no llegue a completarse.
        flightGuard.current = setTimeout(onFlightDone, 1200);
      });
    },
    [reduceMotion, centerOf, onFlightDone],
  );

  /* ---------- línea activa en el editor ---------- */

  const setActiveLine = useCallback((line: number | null) => {
    const lines = codeRef.current?.querySelectorAll<HTMLElement>(".line");
    if (!lines) return;
    lines.forEach((el, i) => el.classList.toggle("is-active", i + 1 === line));
  }, []);

  // Sincroniza en navegación (retroceso, reset). Durante la ejecución,
  // runStep marca la línea ANTES de animar: el resaltado siempre va
  // por delante del resto de la coreografía.
  useEffect(() => {
    setActiveLine(SNAPSHOTS[step].line);
  }, [step, setActiveLine]);

  /* ---------- coreografía por paso ---------- */

  /**
   * Ejecuta la coreografía del paso `target` partiendo del estado
   * `base` (la RAM tal y como está renderizada al empezar el paso).
   */
  async function runStep(target: number, base: string[]) {
    const def = STEPS[target - 1];
    const line = lineEl(def.line);
    const cpu = cpuDisplayRef.current;
    const lineText = line?.textContent?.trim() ?? "";
    const { starts, nextIndex } = computeCells(base);

    setCallout(null);
    setCpuStatus("ejecutando");

    // La línea a ejecutar se marca primero: el ojo sabe de dónde
    // saldrá la instrucción antes de que empiece a volar.
    setActiveLine(def.line);
    await wait(350);

    // La instrucción viaja del código al procesador.
    await fly(line, cpu, lineText, "instruction");

    if (target === 1 || target === 2) {
      const value = target === 1 ? "12" : "3";
      setCpuDisplay(lineText);
      await wait(400);
      // El valor sale del procesador hacia su celda.
      await fly(cpu, cellEl(nextIndex), value, "value");
      setAnimateValueIndex(base.length);
      setRam(SNAPSHOTS[target].ram);
    }

    if (target === 3) {
      setCpuDisplay("? × ?");
      await wait(300);
      // Los operandos viajan de la RAM al procesador.
      await fly(cellEl(starts[0]), cpu, "12", "value");
      setCpuDisplay("12 × ?");
      await fly(cellEl(starts[1]), cpu, "3", "value");
      setCpuDisplay("12 × 3");
      await wait(500);
      setCpuDisplay("36"); // la multiplicación
      await wait(500);
      await fly(cpu, cellEl(nextIndex), "36", "value");
      setAnimateValueIndex(base.length);
      setRam(SNAPSHOTS[target].ram);
    }

    if (target === 4) {
      // mensaje = f"Total: {total} €" — el f-string se evalúa en la CPU.
      setCpuDisplay("f-string");
      await wait(300);
      await fly(cellEl(starts[2]), cpu, "36", "value");
      setCpuDisplay(`"${OUTPUT}"`);
      await wait(400);
      // El texto compuesto se escribe en memoria, carácter a carácter.
      await fly(cpu, cellEl(nextIndex), OUTPUT, "value");
      setAnimateValueIndex(base.length);
      setRam(SNAPSHOTS[target].ram);
      await wait(OUTPUT.length * 50 + 300);
    }

    if (target === 5) {
      // print(mensaje) — el texto ya existe; solo sale hacia la pantalla.
      setCpuDisplay("print(mensaje)");
      await wait(300);
      await fly(cellEl(starts[3]), cpu, OUTPUT, "value");
      await wait(300);
      setModalOpen(true);
    }

    setCpuDisplay(null);
    setCpuStatus("en reposo");
    setCallout(STEPS[target - 1].callout);
    setStep(target);
  }

  async function forward() {
    if (busy || step >= STEPS.length) return;
    setBusy(true);
    try {
      await runStep(step + 1, ram);
    } finally {
      setBusy(false);
    }
  }

  /** Repite la animación del paso actual: restaura la base y re-ejecuta. */
  async function replay() {
    if (busy || step === 0) return;
    setBusy(true);
    try {
      const base = SNAPSHOTS[step - 1];
      setRam(base.ram);
      setAnimateValueIndex(undefined);
      setModalOpen(false);
      setCallout(null);
      // Deja que el DOM pinte la base antes de medir celdas de destino.
      await wait(120);
      await runStep(step, base.ram);
    } finally {
      setBusy(false);
    }
  }

  /** Retroceder restaura la instantánea sin animación: honesto y rápido. */
  function restore(target: number) {
    if (busy) return;
    setStep(target);
    setRam(SNAPSHOTS[target].ram);
    setAnimateValueIndex(undefined);
    setCpuDisplay(null);
    setCpuStatus("en reposo");
    setModalOpen(false);
    setCallout(
      target === 0
        ? { target: "code", text: INITIAL_HINT }
        : STEPS[target - 1].callout,
    );
  }

  const calloutFor = (target: CalloutTarget) =>
    callout?.target === target ? callout.text : null;

  /* ---------- render ---------- */

  return (
    <>
      <div className="flex flex-col gap-4">
        <Controls
          step={step}
          totalSteps={STEPS.length}
          busy={busy}
          onBack={() => restore(step - 1)}
          onForward={forward}
          onReplay={replay}
          onReset={() => restore(0)}
        />

        <div
          ref={sceneRef}
          className="relative grid gap-8 rounded-2xl border border-border bg-[radial-gradient(circle,var(--color-border)_1px,transparent_1px)] p-6 [background-size:18px_18px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:p-10"
        >
          <CodePanel html={html} filename="programa.py" containerRef={codeRef}>
            <Callout text={calloutFor("code")} />
          </CodePanel>

          <div className="flex flex-col gap-8">
            <Cpu display={cpuDisplay} status={cpuStatus} displayRef={cpuDisplayRef}>
              <Callout text={calloutFor("cpu")} />
            </Cpu>
            <div className="relative">
              <Callout text={calloutFor("ram")} />
              <Ram
                values={ram}
                animateValueIndex={animateValueIndex}
                containerRef={ramRef}
              />
            </div>
          </div>

          <AnimatePresence>
            {flight && (
              <FlyingToken key={flight.id} flight={flight} onDone={onFlightDone} />
            )}
          </AnimatePresence>
        </div>
      </div>

      <OutputModal open={modalOpen} onOpenChange={setModalOpen} output={OUTPUT} />
    </>
  );
}
