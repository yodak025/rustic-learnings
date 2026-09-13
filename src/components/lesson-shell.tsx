import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import type { LessonMeta } from "@/lessons/types";

const statusLabel: Record<LessonMeta["status"], string> = {
  available: "Disponible",
  draft: "En construcción",
  planned: "Planificada",
};

/**
 * Marco común de todas las lecciones: cabecera con metadatos y un área
 * principal donde la micro-SPA hace lo que quiera.
 */
export function LessonShell({
  meta,
  children,
}: {
  meta: LessonMeta;
  children: ReactNode;
}) {
  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Badge variant={meta.status === "available" ? "default" : "secondary"}>
            {statusLabel[meta.status]}
          </Badge>
          <span className="font-mono text-xs text-muted-foreground">
            ~{meta.duration} min
          </span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-balance">
          {meta.title}
        </h1>
        <p className="max-w-prose text-pretty leading-relaxed text-muted-foreground">
          {meta.summary}
        </p>
      </header>

      {children}
    </article>
  );
}
