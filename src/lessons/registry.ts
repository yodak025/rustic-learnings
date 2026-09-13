import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/**
 * Mapa slug → componente de lección, con carga dinámica.
 * Cada lección es un chunk independiente: una micro-SPA que solo
 * se descarga al entrar en su ruta.
 */
export const lessonComponents: Record<string, ComponentType> = {
  computation: dynamic(() => import("@/lessons/computation")),
  "operating-systems": dynamic(() => import("@/lessons/operating-systems")),
  internet: dynamic(() => import("@/lessons/internet")),
  "software-lifecycle": dynamic(() => import("@/lessons/software-lifecycle")),
  llms: dynamic(() => import("@/lessons/llms")),
  "ai-agents": dynamic(() => import("@/lessons/ai-agents")),
};
