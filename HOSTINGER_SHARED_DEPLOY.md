# Publicación en Hostinger (Hosting Compartido)

Este proyecto quedó preparado para generar un paquete `.zip` que Hostinger puede recibir en migración/importación:

```bash
npm run hostinger:package
```

## Resultado

Se crea un archivo en `dist/` con nombre similar a:

- `creamostech-hostinger-shared-YYYYMMDD-HHMMSS.zip`

El `.zip` contiene:

- `site-files/` (archivos del sitio)
- `database.sql` (dump SQL si existe `prisma/dev.db`)
- `database_schema.sql` (fallback con esquema base)
- `README_HOSTINGER.txt`

## Subida a Hostinger

1. Abre la herramienta de migración/importación en hPanel.
2. Sube el `.zip` generado.
3. Si Hostinger te solicita base de datos separada, usa `database.sql`.

## Importante para este stack (Next.js + Prisma)

Tu proyecto usa Next.js con `app/api` y backend Prisma. En hosting compartido tradicional, puede que no tengas runtime Node.js para ejecutar backend/SSR.

Si tu plan no soporta Node.js:

- podrás alojar contenido estático,
- pero no funcionarán las rutas API ni el panel admin como backend completo.

Para funcionamiento total (frontend + API + Prisma), usa un plan con Node.js o un VPS.
