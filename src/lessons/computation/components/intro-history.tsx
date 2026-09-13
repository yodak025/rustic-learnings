"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Capítulo 1 — contexto histórico. Solo texto: la idea de que un
 * ordenador es una máquina de Turing, sin entrar en formalismos.
 */
export function IntroHistory({ onNext }: { onNext: () => void }) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-6"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-brand">
          1936 · antes del silicio
        </p>

        <h2 className="text-2xl font-semibold tracking-tight text-balance">
          Todo ordenador es la misma máquina
        </h2>

        <div className="flex flex-col gap-4 leading-relaxed text-muted-foreground">
          <p>
            Años antes de que existiera el primer ordenador,{" "}
            <a
              href="https://es.wikipedia.org/wiki/Alan_Turing"
              target="_blank"
              rel="noreferrer"
              className="text-brand underline underline-offset-4"
            >
              Alan Turing
            </a>{" "}
            describió uno con papel y lápiz. Su artefacto imaginario tenía tres
            piezas: una <strong className="text-foreground">cinta</strong> donde
            leer y escribir símbolos, un{" "}
            <strong className="text-foreground">cabezal</strong> que se mueve
            por ella, y una <strong className="text-foreground">tabla de
            reglas</strong> que dicta qué hacer en cada momento.
          </p>
          <p>
            Lo demostrado fue enorme: esa cosa tan simple puede realizar{" "}
            <em>cualquier cálculo que pueda calcularse</em>. No hay operación
            matemática, videojuego ni modelo de IA que necesite nada más — solo
            una cinta más larga y reglas más elaboradas. Es la{" "}
            <a
              href="https://es.wikipedia.org/wiki/M%C3%A1quina_de_Turing"
              target="_blank"
              rel="noreferrer"
              className="text-brand underline underline-offset-4"
            >
              máquina de Turing
            </a>
            .
          </p>
          <p>
            Tu portátil, tu móvil y el servidor que te está enseñando esta
            página son exactamente eso: máquinas de Turing con la cinta muy
            rápida y las reglas muy largas. En esta lección vamos a abrir una y
            a mirar dónde vive la cinta y quién mueve el cabezal.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Button onClick={onNext}>
          Abrir la máquina
          <ArrowRight className="size-4" />
        </Button>
      </motion.div>
    </div>
  );
}
