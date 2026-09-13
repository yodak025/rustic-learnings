/**
 * El programa de la lección. Cada línea ejecutable se trata como si
 * fuera una instrucción de máquina: simplificación deliberada que la
 * lección reconocerá al final.
 */
export const program = `precio = 12
cantidad = 3

total = precio * cantidad

mensaje = f"Total: {total} €"
print(mensaje)`;

/** Texto que produce el f-string al ejecutarse. */
export const OUTPUT = "Total: 36 €";
