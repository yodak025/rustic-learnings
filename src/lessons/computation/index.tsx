import { codeToHtml } from "shiki";
import { LessonShell } from "@/components/lesson-shell";
import { LessonFlow } from "./components/lesson-flow";
import { program } from "./program";
import { meta } from "./meta";

export { meta };

export default async function ComputationLesson() {
  const html = await codeToHtml(program, {
    lang: "python",
    themes: {
      light: "light-plus",
      dark: "dark-plus",
    },
    defaultColor: "light",
    transformers: [
      {
        // Elimina los saltos de línea entre spans .line: así cada línea
        // puede ser display:block y el resaltado cubre el ancho completo.
        code(node) {
          node.children = node.children.filter(
            (child) => !(child.type === "text" && child.value === "\n"),
          );
        },
      },
    ],
  });

  return (
    <LessonShell meta={meta}>
      <LessonFlow html={html} />
    </LessonShell>
  );
}
