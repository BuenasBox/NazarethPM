# Nazareth PM — Micro-sitio (GitHub Pages)

Sitio estático optimizado para indexación (SEO), Open Graph/Twitter y JSON-LD (Person + Organization).

## URL pública
https://BuenasBox.github.io/nazarethpm/

## Estructura
- `index.html` — página principal
- `assets/`
  - `nazareth-padilla-montero-profile.jpg` (foto profesional)
  - `cava-logo.svg` (logo Cava)
  - `favicon.svg` (favicon)
- `robots.txt` y `sitemap.xml`
- `.nojekyll` (vacío para evitar procesamiento Jekyll)

## Deploy (GitHub Pages)
1. Crea el repo **público** `nazarethpm` en tu cuenta `BuenasBox`.
2. Sube todos los archivos y la carpeta `assets/`.
3. En **Settings → Pages**:
   - Source: **Deploy from branch**
   - Branch: `main` · Folder: `/ (root)`
4. Espera ~30 s y visita: https://BuenasBox.github.io/nazarethpm/

## Personalización
- Actualiza imágenes en `assets/`.
- Si luego apuntas un dominio propio (ej. `nazareth.cavagourmet.com`), añade archivo `CNAME` con ese dominio y ajusta `canonical`, OG y `sitemap.xml`.
