import { AnimatePresence, motion } from "motion/react";

/**
 * Anotación flotante que aparece junto al actor implicado en cada paso.
 * Se monta dentro de un contenedor `relative` del propio actor.
 */
export function Callout({ text }: { text: string | null }) {
  return (
    <AnimatePresence>
      {text && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.25 }}
          className="absolute -top-2 right-2 z-10 max-w-64 -translate-y-full rounded-lg border border-brand/40 bg-popover px-3 py-2 text-xs leading-relaxed shadow-md"
        >
          {text}
          <span
            className="absolute -bottom-1 right-6 size-2 rotate-45 border-b border-r border-brand/40 bg-popover"
            aria-hidden
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
