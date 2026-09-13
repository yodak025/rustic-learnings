import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * La "pantalla" del ordenador: donde aterriza lo que print envía.
 * Aparece superpuesto porque la salida ya no vive en la máquina que
 * hemos dibujado — es el mundo exterior.
 */
export function OutputModal({
  open,
  onOpenChange,
  output,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  output: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-mono text-sm font-normal text-muted-foreground">
            pantalla
          </DialogTitle>
          <DialogDescription className="sr-only">
            Salida del programa
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-lg border border-border bg-secondary/50 px-6 py-8 text-center">
          <p className="font-mono text-2xl tracking-tight">{output}</p>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          <code className="font-mono">print</code> no calcula nada: coge el texto
          que <code className="font-mono">mensaje</code> señala en memoria y lo
          saca de la máquina, hacia la pantalla. Es la frontera entre el
          programa y tú.
        </p>
      </DialogContent>
    </Dialog>
  );
}
