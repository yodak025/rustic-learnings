import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { courses, getCourse } from "@/lib/courses";

export function generateStaticParams() {
  return courses.map((c) => ({ course: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/courses/[course]">): Promise<Metadata> {
  const { course: slug } = await params;
  const course = getCourse(slug);
  return { title: course?.title ?? "Curso" };
}

const statusLabel = {
  available: "Disponible",
  draft: "En construcción",
  planned: "Planificada",
} as const;

export default async function CoursePage({
  params,
}: PageProps<"/courses/[course]">) {
  const { course: slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-col gap-4">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Curso
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {course.title}
        </h1>
        <p className="max-w-prose text-pretty leading-relaxed text-muted-foreground">
          {course.description}
        </p>
      </header>

      <section className="flex flex-col gap-6">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Lecciones
        </h2>
        <ol className="flex flex-col divide-y divide-border border-y border-border">
          {course.lessons.map((lesson, i) => (
            <li key={lesson.slug}>
              <Link
                href={`/courses/${course.slug}/${lesson.slug}`}
                className="group flex items-baseline gap-5 py-5"
              >
                <span className="font-mono text-sm text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex flex-1 flex-col gap-1">
                  <span className="flex flex-wrap items-center gap-3">
                    <span className="font-medium transition-colors group-hover:text-brand">
                      {lesson.title}
                    </span>
                    <Badge
                      variant={lesson.status === "available" ? "default" : "secondary"}
                    >
                      {statusLabel[lesson.status]}
                    </Badge>
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {lesson.summary}
                  </span>
                </span>
                <span className="hidden font-mono text-xs text-muted-foreground sm:block">
                  ~{lesson.duration} min
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
