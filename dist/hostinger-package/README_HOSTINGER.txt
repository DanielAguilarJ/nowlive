Hostinger Shared Hosting - Migration Package

Contenido:
1) site-files/        -> Archivos del proyecto web
2) database.sql       -> Dump de base de datos (si estaba disponible)
3) database_schema.sql (opcional) -> Esquema base Prisma

Subida recomendada en Hostinger:
- Ve a la herramienta de migración/importación
- Sube este .zip completo
- Si te pide base de datos separada, usa database.sql

Nota técnica:
- Este proyecto está hecho con Next.js + API routes + Prisma.
- En hosting compartido tradicional, Node.js puede no estar disponible.
- Si no hay soporte Node en tu plan, publica solo salida estática o migra a VPS/Hosting con Node.
