export type LessonStatus = "available" | "draft" | "planned";

export type LessonMeta = {
  slug: string;
  title: string;
  /** Frase corta para listados. */
  summary: string;
  /** Qué debería poder explicar el alumno al terminar. */
  outcome: string;
  status: LessonStatus;
  /** Minutos estimados de interacción. */
  duration: number;
};
