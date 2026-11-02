# Indigoff — sitio web (React + Vite)

## Requisitos
- Node.js 18 o más reciente

## Correr en tu computadora
```bash
npm install
npm run dev
```
Abre http://localhost:5173

## Compilar para producción
```bash
npm run build
```
Se genera la carpeta `dist/`, que es lo que se sube al hosting.

## Páginas
| Ruta | Página |
|------|--------|
| `/` | Inicio |
| `/ceilings`, `/walls`, `/lights`, `/dividers`, `/podcaster` | Categorías (`#frames`, `#clouds`… abre directo esa pestaña) |
| `/downloads` | Descargas |
| `/find-a-rep` | Encuentra un representante |
| `/onoff-studio` | onoff studio — diseño acústico y de iluminación |

Es una SPA: el hosting debe mandar cualquier ruta a `index.html`
(ya incluidos: `public/_redirects` para Netlify y `vercel.json` para Vercel).

## Estructura
- `src/pages/*.jsx` — cada página: datos + lógica arriba, plantilla JSX abajo (`Component.template`).
- `src/pages/*.css` — estilos de cada página.
- `src/dc.js` — clase base y helper de estilos.
- `public/img/` — todas las fotos y logos.

## Pendientes antes de publicar
- Archivos CAD/BIM: los links apuntan a `/downloads/<producto>/<archivo>`; copia esos archivos a `public/downloads/`.
- Formulario "Sign up" y "Email my list": conectarlos a tu correo/CRM.
- Links reales de redes sociales y datos de contacto ([Phone], [hello@indigoff.com], NRC).
