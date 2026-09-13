import { ChevronLeft, ChevronRight, RefreshCw, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Controls({
  step,
  totalSteps,
  busy,
  onBack,
  onForward,
  onReplay,
  onReset,
}: {
  step: number;
  totalSteps: number;
  busy: boolean;
  onBack: () => void;
  onForward: () => void;
  onReplay: () => void;
  onReset: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          aria-label="Paso anterior"
          disabled={busy || step === 0}
          onClick={onBack}
        >
          <ChevronLeft className="size-4" />
        </Button>
        <Button
          size="icon"
          aria-label="Ejecutar siguiente línea"
          disabled={busy || step === totalSteps}
          onClick={onForward}
        >
          <ChevronRight className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          aria-label="Repetir este paso"
          disabled={busy || step === 0}
          onClick={onReplay}
        >
          <RefreshCw className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Reiniciar"
          disabled={busy || step === 0}
          onClick={onReset}
        >
          <RotateCcw className="size-4" />
        </Button>
      </div>
      <span className="font-mono text-xs text-muted-foreground">
        paso {step}/{totalSteps}
      </span>
    </div>
  );
}
