"use client";

import { LessonShell } from "@/components/lesson-shell";
import { LessonPlaceholder } from "@/components/lesson-placeholder";
import { meta } from "./meta";

export { meta };

const plannedScenes = [
  "Un desarrollador con su programa y su play. Funciona en su máquina. Aparecen 1.000 usuarios: ¿ahora qué?",
  "El pipeline como cinta transportadora: el código pasa por estaciones (build, tests) y solo avanza si supera cada una.",
  "El despliegue: la versión nueva sustituye a la vieja sin apagar la fábrica. Los usuarios ni se enteran.",
  "Algo sale mal en producción. Rollback: la versión anterior sigue ahí y vuelve en segundos. El miedo desaparece del proceso.",
];

export default function SoftwareLifecycleLesson() {
  return (
    <LessonShell meta={meta}>
      <LessonPlaceholder planned={plannedScenes} />
    </LessonShell>
  );
}
