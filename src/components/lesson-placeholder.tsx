"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Relleno temporal del área interactiva de una lección.
 * Existe para validar el layout y el code-splitting por lección;
 * se sustituye por la animación real cuando la lección se construya.
 */
export function LessonPlaceholder({ planned }: { planned: string[] }) {
  const [step, setStep] = useState(0);
  const last = planned.length - 1;

  return (
    <Card className="border-dashed">
      <CardContent className="flex min-h-64 flex-col items-center justify-center gap-6 p-8 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Escena {step + 1} / {planned.length} — maqueta
        </p>
        <p className="max-w-md text-pretty leading-relaxed">{planned[step]}</p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={step === 0}
            onClick={() => setStep((s) => s - 1)}
          >
            Anterior
          </Button>
          <Button
            size="sm"
            disabled={step === last}
            onClick={() => setStep((s) => s + 1)}
          >
            Siguiente
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
