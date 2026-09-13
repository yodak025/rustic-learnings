# rustic-learnings

Cuaderno público de apuntes. Sitio estático construido con Next.js.

## Stack

| Pieza | Elección |
|---|---|
| Framework | Next.js 16 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 |
| Runtime | Node.js |

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
```

Otros comandos:

```bash
npm run build    # build de producción
npm run start    # sirve el build
npm run lint     # ESLint
```

## Estructura

```
src/
  app/           rutas (App Router)
  components/    componentes de UI
  lib/           datos y utilidades
docs/            decisiones de diseño
```

## Documentación

- [`docs/cicd.md`](docs/cicd.md) — modelo de despliegue continuo

## Licencia

Código bajo [AGPL-3.0](LICENSE).
