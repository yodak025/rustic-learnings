"use client";

import { LessonShell } from "@/components/lesson-shell";
import { LessonPlaceholder } from "@/components/lesson-placeholder";
import { meta } from "./meta";

export { meta };

const plannedScenes = [
  "Dos de nuestras máquinas amigables, un cable entre ellas. Un mensaje viaja de una a otra. Eso es toda la magia.",
  "El mensaje es grande: se trocea en paquetes numerados que viajan por caminos distintos y se recomponen al llegar.",
  "Escribes una URL: primero alguien traduce el nombre a una dirección (DNS), luego los paquetes saben a dónde ir.",
  "Zoom out: miles de máquinas y routers. Marcas dos y ves la ruta que los paquetes eligen entre ellas.",
];

export default function InternetLesson() {
  return (
    <LessonShell meta={meta}>
      <LessonPlaceholder planned={plannedScenes} />
    </LessonShell>
  );
}
