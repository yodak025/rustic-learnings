import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { courses, getLesson } from "@/lib/courses";
import { lessonComponents } from "@/lessons/registry";

export function generateStaticParams() {
  return courses.flatMap((course) =>
    course.lessons.map((lesson) => ({
      course: course.slug,
      lesson: lesson.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/courses/[course]/[lesson]">): Promise<Metadata> {
  const { course, lesson } = await params;
  const found = getLesson(course, lesson);
  return { title: found?.lesson.title ?? "Lección" };
}

export default async function LessonPage({
  params,
}: PageProps<"/courses/[course]/[lesson]">) {
  const { course: courseSlug, lesson: lessonSlug } = await params;
  const found = getLesson(courseSlug, lessonSlug);
  if (!found) notFound();

  const { course, index } = found;
  const Lesson = lessonComponents[lessonSlug];
  if (!Lesson) notFound();

  const prev = course.lessons[index - 1];
  const next = course.lessons[index + 1];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12">
      <nav aria-label="Curso" className="font-mono text-xs text-muted-foreground">
        <Link href={`/courses/${course.slug}`} className="hover:text-foreground">
          {course.title}
        </Link>{" "}
        · {String(index + 1).padStart(2, "0")}
      </nav>

      <Lesson />

      <Separator />

      <nav aria-label="Lecciones" className="flex items-center justify-between gap-4 text-sm">
        {prev ? (
          <Link
            href={`/courses/${course.slug}/${prev.slug}`}
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/courses/${course.slug}/${next.slug}`}
            className="flex items-center gap-2 text-right text-muted-foreground transition-colors hover:text-foreground"
          >
            {next.title}
            <ArrowRight className="size-4" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
