import type { ReactNode, RefObject } from "react";

/**
 * Panel de código estilo editor: barra con el nombre del fichero y
 * cuerpo resaltado por shiki (gramática y temas de VSCode). La línea
 * activa se marca desde la escena añadiendo la clase `is-active` al
 * span `.line` correspondiente.
 */
export function CodePanel({
  html,
  filename,
  containerRef,
  children,
}: {
  html: string;
  filename: string;
  containerRef?: RefObject<HTMLDivElement | null>;
  children?: ReactNode;
}) {
  return (
    <div className="code-panel relative flex flex-col self-start overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      {children}
      <div className="flex items-center gap-3 border-b border-border px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">{filename}</span>
      </div>
      <div
        ref={containerRef}
        className="overflow-x-auto p-4 font-mono text-sm leading-7"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
