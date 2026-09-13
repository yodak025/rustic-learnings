import type { LessonMeta } from "@/lessons/types";
import { meta as computation } from "@/lessons/computation/meta";
import { meta as operatingSystems } from "@/lessons/operating-systems/meta";
import { meta as internet } from "@/lessons/internet/meta";
import { meta as softwareLifecycle } from "@/lessons/software-lifecycle/meta";
import { meta as llms } from "@/lessons/llms/meta";
import { meta as aiAgents } from "@/lessons/ai-agents/meta";

export type Course = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  /** El orden del array es el orden pedagógico. */
  lessons: LessonMeta[];
};

export const courses: Course[] = [
  {
    slug: "computing-era",
    title: "Contexto: la era de la computación",
    tagline: "Los prerequisitos que nadie te explicó",
    description:
      "Un punto de aterrizaje para perfiles semitécnicos: gente que trabaja " +
      "alrededor del software sin haber visto nunca qué hay dentro. Seis " +
      "lecciones interactivas para construir la intuición que los libros " +
      "dan por supuesta. El objetivo no es formar especialistas: es que la " +
      "informática deje de dar vértigo.",
    lessons: [
      computation,
      operatingSystems,
      internet,
      softwareLifecycle,
      llms,
      aiAgents,
    ],
  },
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getLesson(
  courseSlug: string,
  lessonSlug: string,
): { course: Course; lesson: LessonMeta; index: number } | undefined {
  const course = getCourse(courseSlug);
  if (!course) return undefined;
  const index = course.lessons.findIndex((l) => l.slug === lessonSlug);
  if (index === -1) return undefined;
  return { course, lesson: course.lessons[index], index };
}
