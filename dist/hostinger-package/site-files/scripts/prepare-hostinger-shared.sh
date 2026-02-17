#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
DIST_DIR="$ROOT_DIR/dist"
PKG_DIR="$DIST_DIR/hostinger-package"
SITE_DIR="$PKG_DIR/site-files"
ZIP_NAME="creamostech-hostinger-shared-${TIMESTAMP}.zip"
ZIP_PATH="$DIST_DIR/$ZIP_NAME"

echo "📦 Preparando paquete para Hostinger (hosting compartido)..."

rm -rf "$PKG_DIR"
mkdir -p "$SITE_DIR"
mkdir -p "$DIST_DIR"

echo "📁 Copiando archivos del sitio..."
rsync -a \
  --exclude='.git/' \
  --exclude='.github/' \
  --exclude='.next/' \
  --exclude='node_modules/' \
  --exclude='out/' \
  --exclude='dist/' \
  --exclude='coverage/' \
  --exclude='.DS_Store' \
  "$ROOT_DIR/" "$SITE_DIR/"

echo "🗄️ Preparando base de datos (.sql)..."
if [ -f "$ROOT_DIR/prisma/dev.db" ] && command -v sqlite3 >/dev/null 2>&1; then
  sqlite3 "$ROOT_DIR/prisma/dev.db" .dump > "$PKG_DIR/database.sql"
  echo "✅ Dump generado desde prisma/dev.db"
else
  cp "$ROOT_DIR/prisma/migrations/20260114224413_init/migration.sql" "$PKG_DIR/database_schema.sql"
  cat > "$PKG_DIR/database.sql" <<'SQL'
-- No se encontró prisma/dev.db o sqlite3 en el sistema.
-- Este archivo se deja como marcador para migración manual.
-- Usa database_schema.sql como esquema base.
SQL
  echo "⚠️ No se pudo generar dump completo. Se incluyó esquema base en database_schema.sql"
fi

cat > "$PKG_DIR/README_HOSTINGER.txt" <<'TXT'
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
TXT

echo "🧹 Limpiando archivos innecesarios dentro de site-files..."
rm -rf "$SITE_DIR/node_modules" "$SITE_DIR/.next" "$SITE_DIR/dist" || true

echo "🗜️ Creando ZIP final..."
(
  cd "$PKG_DIR"
  zip -r "$ZIP_PATH" . >/dev/null
)

echo "\n✅ Paquete listo:"
echo "   $ZIP_PATH"
echo "\nSiguiente paso: súbelo en Hostinger (migración o File Manager)."
