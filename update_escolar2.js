const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// 1. Update body.theme-escolar background
css = css.replace(
    /body\.theme-escolar \{\s*--azul-noche: #1e3a8a;\s*--amarillo-lapiz: #fbbf24;\s*--naranja-calido: #f97316;\s*--blanco-crema: #fdfbf7;\s*--blanco: #ffffff;\s*--texto-oscuro: #1e293b;\s*background: var\(--blanco-crema\) !important;\s*color: var\(--texto-oscuro\) !important;\s*font-family: 'Nunito', sans-serif !important;\s*\}/g,
    `body.theme-escolar {
    --azul-noche: #0f172a;
    --amarillo-lapiz: #fbbf24;
    --rojo-manzana: #ef4444;
    --blanco-crema: #fdfbf7;
    --blanco: #ffffff;
    --texto-claro: #f8fafc;
    background: url('escolar-bg.jpg') center/cover fixed !important;
    color: var(--texto-claro) !important;
    font-family: 'Nunito', sans-serif !important;
}
/* Overlay oscuro para toda la página para legibilidad general */
body.theme-escolar::after {
    content: "";
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(15, 23, 42, 0.7); /* Azul muy oscuro semitransparente */
    z-index: -1;
}`
);

// 2. Remove the background image from .escolar-special since it's now on the body, 
// and make it transparent so the global background shows through.
css = css.replace(
    /body\.theme-escolar \.escolar-special \{\s*position: relative;\s*width: 100vw !important;\s*margin-left: calc\(-50vw \+ 50%\) !important;\s*overflow: hidden;\s*background: url\('escolar-bg\.jpg'\) center center no-repeat;\s*background-size: cover;\s*border-bottom: 4px solid var\(--amarillo-lapiz\);\s*\}/g,
    `body.theme-escolar .escolar-special {
    position: relative;
    width: 100vw !important;
    margin-left: calc(-50vw + 50%) !important;
    overflow: hidden;
    background: transparent;
    border-bottom: 4px solid var(--amarillo-lapiz);
}`
);

// Remove the overlay from .escolar-special::before (since the body has one now)
css = css.replace(
    /body\.theme-escolar \.escolar-special::before \{\s*content: "";\s*position: absolute;\s*top: 0; left: 0; right: 0; bottom: 0;\s*background: rgba\(30, 58, 138, 0\.6\);[^\}]*\}/g,
    ``
);

// 3. Update the Cards for Escolar Theme (Dark mode + Glassmorphism)
const cardStyles = `

/* Adaptar tarjetas del catálogo al nuevo fondo */
body.theme-escolar .catalog-card,
body.theme-escolar .card,
body.theme-escolar .glass-card {
    background: rgba(15, 23, 42, 0.6) !important;
    backdrop-filter: blur(10px) !important;
    border: 2px solid rgba(251, 191, 36, 0.3) !important;
    color: #ffffff !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4) !important;
}
body.theme-escolar .catalog-card:hover,
body.theme-escolar .card:hover,
body.theme-escolar .glass-card:hover {
    border-color: var(--amarillo-lapiz) !important;
    transform: translateY(-5px) !important;
    box-shadow: 0 15px 40px rgba(251, 191, 36, 0.2) !important;
}
body.theme-escolar .catalog-card p,
body.theme-escolar .card p,
body.theme-escolar .glass-card p {
    color: #e2e8f0 !important;
}
body.theme-escolar .catalog-card h3,
body.theme-escolar .card h3,
body.theme-escolar .glass-card h3 {
    color: var(--amarillo-lapiz) !important;
}
body.theme-escolar .btn-add-cart {
    background: var(--rojo-manzana) !important;
    color: white !important;
}
body.theme-escolar .btn-add-cart:hover {
    background: #dc2626 !important;
}
`;

css += cardStyles;

fs.writeFileSync('styles.css', css);
console.log('Global escolar theme updated');
