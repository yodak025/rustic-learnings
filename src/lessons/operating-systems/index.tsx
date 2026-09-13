"use client";

import { LessonShell } from "@/components/lesson-shell";
import { LessonPlaceholder } from "@/components/lesson-placeholder";
import { meta } from "./meta";

export { meta };

const plannedScenes = [
  "La ciudad de la lección anterior, pero ahora con una recepción: los programas ya no entran directos al hardware.",
  "Dos programas piden memoria a la vez. El SO da a cada uno su parcela y ninguno ve la del otro.",
  "Un programa pide leer un fichero: la petición pasa por ventanilla (syscall) y el SO decide y ejecuta.",
  "El reparto de turnos: decenas de procesos, una CPU, y la ilusión de que todo corre a la vez.",
];

export default function OperatingSystemsLesson() {
  return (
    <LessonShell meta={meta}>
      <LessonPlaceholder planned={plannedScenes} />
    </LessonShell>
  );
}
