import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { courses } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Cursos",
};

export default function CoursesPage() {
  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">Cursos</h1>
        <p className="max-w-prose text-pretty leading-relaxed text-muted-foreground">
          Cada curso es una secuencia corta de lecciones interactivas. Sin
          vídeos de dos horas, sin certificados: intuición.
        </p>
      </header>

      <div className="flex flex-col gap-4">
        {courses.map((course) => (
          <Link key={course.slug} href={`/courses/${course.slug}`} className="group">
            <Card className="transition-colors group-hover:border-ring">
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-4">
                  {course.title}
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </CardTitle>
                <CardDescription>{course.tagline}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-xs text-muted-foreground">
                  {course.lessons.length} lecciones
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
