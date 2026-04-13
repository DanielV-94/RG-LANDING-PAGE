# RG Landing Page

Landing page moderna para RG Servicios con animaciones avanzadas y enfoque UI/UX, creada usando los recursos de `INFO/` y `LOGO/`.

El copy comercial principal fue tomado de `INFO/info.md` y `INFO/albañileria.md`.

## Estructura

- `index.html`: estructura principal de la página.
- `styles.css`: estilos visuales, layout y responsividad.
- `script.js`: animaciones de entrada, scroll y microinteracciones avanzadas.
- `INFO/`: imágenes de servicios.
- `LOGO/`: logos de la marca.

## Highlights de la versión actual

- Loader inicial animado.
- Cursor personalizado (en escritorio).
- Barra de progreso de scroll.
- Menú móvil tipo hamburguesa con apertura suave.
- Animaciones por secciones con `GSAP + ScrollTrigger`.
- Botones magnéticos y parallax sutil en cards.
- Compatibilidad con `prefers-reduced-motion`.

## Ejecutar localmente

Abre `index.html` directamente en el navegador o usa un servidor local estático para mejor compatibilidad.

Ejemplo rápido (opcional):

```powershell
Set-Location "C:\Users\Admin\Downloads\RG LANDING PAGE"
npx serve .
```

## Personalización rápida

- Cambiar WhatsApp en `index.html` (buscar `wa.me/0000000000`).
- Actualizar textos de servicios en las tarjetas.
- Ajustar colores en `:root` dentro de `styles.css`.
- Si deseas desactivar cursor custom, elimina los elementos `#cursor-dot` y `#cursor-ring` de `index.html`.
