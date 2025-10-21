# Nazareth PM — Micro-sitio (GitHub Pages)

URL pública: https://BuenasBox.github.io/NazarethPM/

Sitio estático con SEO, Open Graph/Twitter y JSON-LD (Person + Organization).

## Estructura
- `index.html` — página principal (contiene metadatos y schema)
- `robots.txt` — habilita indexación y declara el sitemap
- `sitemap.xml` — mapa de sitio para buscadores
- `.nojekyll` — evita procesamiento Jekyll
- `assets/`
  - `9b948966-bf54-44e9-8a4d-7a0a9f7643ca.png` — foto profesional (Nazareth)
  - `PhotoRoom-20231102_232057.png` — logo oficial (Cava)
  - (opcional) `favicon.svg`

## Deploy (GitHub Pages)
1. Repo **público** → Settings → **Pages**.
2. Source: *Deploy from a branch* · Branch: `main` · Folder: `/ (root)`.
3. Esperar ~30 s → abrir https://BuenasBox.github.io/NazarethPM/

## SEO
- Verificar en **Google Search Console** la URL del sitio.
- Enviar sitemap: `https://BuenasBox.github.io/NazarethPM/sitemap.xml`.
- Probar datos estructurados en **Rich Results Test**.

## Dominio propio (opcional)
- Crear archivo `CNAME` con el subdominio deseado (ej.: `nazareth.cavagourmet.com`).
- En DNS del dominio: CNAME `nazareth` → `BuenasBox.github.io`.
- Actualizar `canonical`, OG y sitemap si se usa dominio propio.

## Créditos
© Cava Gourmet Market · Nazareth Padilla Montero
