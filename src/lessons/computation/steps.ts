import { OUTPUT } from "./program";

export type CalloutTarget = "code" | "cpu" | "ram";

export type Step = {
  /** Línea (1-indexada) del fichero que ejecuta este paso. */
  line: number;
  /** Anotación que queda visible al completarse el paso. */
  callout: { target: CalloutTarget; text: string };
};

/**
 * Instantánea del estado tras cada paso. El índice 0 es el estado
 * inicial (nada ejecutado). Retroceder = restaurar instantánea.
 */
export const SNAPSHOTS: { ram: string[]; line: number | null }[] = [
  { ram: [], line: null },
  { ram: ["12"], line: 1 },
  { ram: ["12", "3"], line: 2 },
  { ram: ["12", "3", "36"], line: 4 },
  { ram: ["12", "3", "36", OUTPUT], line: 6 },
  { ram: ["12", "3", "36", OUTPUT], line: 7 },
];

export const STEPS: Step[] = [
  {
    line: 1,
    callout: {
      target: "ram",
      text: "La CPU ejecuta la instrucción y apunta 12 en la memoria.",
    },
  },
  {
    line: 2,
    callout: {
      target: "ram",
      text: "Otra instrucción, otro valor apuntado: 3.",
    },
  },
  {
    line: 4,
    callout: {
      target: "cpu",
      text: "La CPU recoge los dos valores, los multiplica y guarda el resultado. Ella no recuerda nada: todo vuelve a la memoria.",
    },
  },
  {
    line: 6,
    callout: {
      target: "ram",
      text: "El f-string construye el texto y queda guardado en memoria, carácter a carácter, como cualquier otro valor.",
    },
  },
  {
    line: 7,
    callout: {
      target: "cpu",
      text: "print no calcula nada: coge el texto de mensaje y lo saca de la máquina, hacia la pantalla.",
    },
  },
];

export const INITIAL_HINT =
  "Esto es un depurador: ejecuta el programa línea a línea con los controles.";
