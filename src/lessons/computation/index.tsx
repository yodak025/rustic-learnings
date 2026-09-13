"use client";

import { LessonShell } from "@/components/lesson-shell";
import { LessonPlaceholder } from "@/components/lesson-placeholder";
import { meta } from "./meta";

export { meta };

const plannedScenes = [
  "Un programa Python de 3 líneas a la izquierda; a la derecha, CPU, RAM y disco dibujados como una ciudad de tres edificios.",
  "Al pulsar 'ejecutar', cada línea se ilumina y su efecto viaja como una partícula: la variable aparece en la RAM.",
  "Una suma entra en la CPU, se transforma y el resultado vuelve a la RAM. La CPU no recuerda nada.",
  "Guardar un fichero: la partícula baja al disco, lento y persistente. Apagamos la máquina: la RAM se vacía, el disco no.",
];

export default function ComputationLesson() {
  return (
    <LessonShell meta={meta}>
      <LessonPlaceholder planned={plannedScenes} />
    </LessonShell>
  );
}
