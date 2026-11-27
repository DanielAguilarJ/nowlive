# CreamosTech — sitio público (Astro)

Sitio nuevo de creamostech.com. Es estático: `npm run build` genera la carpeta `dist/`, que se sube tal cual al hosting compartido de Hostinger. No necesita Node en el servidor.

## Comandos

```bash
npm install          # una vez
npm run dev          # vista previa con recarga: http://127.0.0.1:4321
npm run build        # genera dist/
npm run preview      # sirve dist/ en http://127.0.0.1:4322
npx astro check      # revisa tipos
npm run extract      # vuelve a copiar los textos desde el proyecto Next.js viejo (../src)
```

## Publicar en Hostinger

1. `npm run build`.
2. En hPanel → Administrador de archivos → `public_html`, haz una copia de seguridad del contenido actual.
3. Sube **el contenido** de `dist/` (no la carpeta) a `public_html`. Incluye `.htaccess` y la carpeta `api/`.
4. En hPanel → Seguridad → SSL, activa «Forzar HTTPS».
5. En Search Console, envía `https://creamostech.com/sitemap-index.xml`.

El formulario de contacto envía a `/api/contact.php`, que usa `mail()` de PHP hacia hola@creamostech.com. Si el correo no llega, el formulario ofrece WhatsApp con el mensaje ya escrito.

## Dónde se cambia cada cosa

| Qué | Archivo |
|---|---|
| Teléfono, WhatsApp, email, dirección, redes | `src/data/site.ts` |
| Textos de la interfaz nueva (botones, avisos, «Solo 3 cupos») | `src/i18n/ui.ts` |
| Textos de servicios, planes, casos, blog | `src/data/raw/*.json` (extraídos del sitio viejo) y `src/data/content.ts` |
| Escena 3D del inicio | `src/scripts/line3d.ts` |
| Colores, tipografía, botones | `src/styles/global.css` |
| Rutas de todas las páginas (ES en `/`, EN en `/en/`) | `src/pages/[...route].astro` |

El sistema visual está documentado en `../DESIGN.md`; los datos del negocio, en `../PRODUCT.md`.
