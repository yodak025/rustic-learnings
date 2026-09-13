"use client";

import { LessonShell } from "@/components/lesson-shell";
import { LessonPlaceholder } from "@/components/lesson-placeholder";
import { meta } from "./meta";

export { meta };

const plannedScenes = [
  "La caja de la lección anterior, ahora con un cinturón de herramientas: leer fichero, ejecutar comando, buscar.",
  "El bucle visible: el modelo propone una acción → el harness la ejecuta → el resultado vuelve como texto → el modelo decide la siguiente.",
  "El harness como escenario: quién escribe el prompt de sistema, dónde se inyecta el AGENTS.md, qué ve el modelo de verdad en cada turno.",
  "Una skill se carga: instrucciones que aparecen en el contexto justo cuando hacen falta. El 'aprendizaje' era un include.",
  "Simulador: das una tarea, ves cada iteración del bucle en cámara lenta y puedes abrir cualquier mensaje intermedio.",
];

export default function AiAgentsLesson() {
  return (
    <LessonShell meta={meta}>
      <LessonPlaceholder planned={plannedScenes} />
    </LessonShell>
  );
}
