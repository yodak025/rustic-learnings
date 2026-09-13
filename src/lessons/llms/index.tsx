"use client";

import { LessonShell } from "@/components/lesson-shell";
import { LessonPlaceholder } from "@/components/lesson-placeholder";
import { meta } from "./meta";

export { meta };

const plannedScenes = [
  "Una caja negra con una entrada y una salida. Entra texto, sale la continuación más plausible. Nada más.",
  "Un chat de verdad al lado de la caja: cada mensaje tuyo y del modelo se concatena y vuelve a entrar entero. El 'recuerdo' es releerlo todo.",
  "La ventana de contexto como cinta de papel finita: cuando se llena, lo del principio se cae. Por eso 'olvida'.",
  "Predicción palabra a palabra con probabilidades visibles: el momento exacto en que una respuesta plausible deja de ser verdadera.",
];

export default function LlmsLesson() {
  return (
    <LessonShell meta={meta}>
      <LessonPlaceholder planned={plannedScenes} />
    </LessonShell>
  );
}
