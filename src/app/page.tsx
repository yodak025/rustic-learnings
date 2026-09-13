import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { courses } from "@/lib/courses";

export default function Home() {
  const course = courses[0];

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-20 px-6 py-16">
      <section className="flex flex-col gap-6 pt-8">
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          La informática deja de dar vértigo cuando ves lo que hay dentro.
        </h1>
        <p className="max-w-prose text-pretty text-lg leading-relaxed text-muted-foreground">
          Lecciones interactivas para gente que trabaja alrededor del software
          sin haberlo estudiado: operaciones, dirección, producto. Los
          prerequisitos que todo el mundo da por supuestos, masticados con
          animaciones y simplificaciones honestas.
        </p>
        <div className="flex items-center gap-4">
          <Button asChild>
            <Link href={`/courses/${course.slug}`}>
              Empezar el curso
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/courses">Ver todos</Link>
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          La tesis
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "No es capacidad, son prerequisitos",
              body: "La informática intimida por lo mismo que las matemáticas: te faltan las piezas de abajo, no las de arriba.",
            },
            {
              title: "Intuición antes que rigor",
              body: "Una simplificación astuta y una animación valen más que un capítulo técnicamente impecable que nadie termina.",
            },
            {
              title: "Interactivo o nada",
              body: "Tocar un modelo mental — avanzar, romper, repetir — fija lo que leer no fija. Cada lección es una pequeña máquina.",
            },
          ].map((item) => (
            <article key={item.title} className="flex flex-col gap-2">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
