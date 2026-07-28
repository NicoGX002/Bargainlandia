const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// 1. Revert global body.theme-escolar to light cream and remove global background image
css = css.replace(
    /body\.theme-escolar \{\s*--azul-noche: #0f172a;\s*--amarillo-lapiz: #fbbf24;\s*--rojo-manzana: #ef4444;\s*--blanco-crema: #fdfbf7;\s*--blanco: #ffffff;\s*--texto-claro: #f8fafc;\s*background: url\('escolar-bg\.jpg'\) center\/cover fixed !important;\s*color: var\(--texto-claro\) !important;\s*font-family: 'Nunito', sans-serif !important;\s*\}/g,
    `body.theme-escolar {
    --azul-noche: #1e3a8a;
    --amarillo-lapiz: #fbbf24;
    --rojo-manzana: #ef4444;
    --naranja-calido: #f97316;
    --blanco-crema: #fdfbf7;
    --blanco: #ffffff;
    --texto-oscuro: #1e293b;
    background: var(--blanco-crema) !important;
    color: var(--texto-oscuro) !important;
    font-family: 'Nunito', sans-serif !important;
}`
);

// Remove the body overlay
css = css.replace(
    /\/\* Overlay oscuro para toda la página para legibilidad general \*\/\s*body\.theme-escolar::after \{\s*content: "";\s*position: fixed;\s*top: 0; left: 0; width: 100%; height: 100%;\s*background: rgba\(15, 23, 42, 0\.7\);\s*z-index: -1;\s*\}/g,
    ``
);

// 2. Put the background image directly on .escolar-special
css = css.replace(
    /body\.theme-escolar \.escolar-special \{\s*position: relative;\s*width: 100vw !important;\s*margin-left: calc\(-50vw \+ 50%\) !important;\s*overflow: hidden;\s*background: transparent;\s*border-bottom: 4px solid var\(--amarillo-lapiz\);\s*\}/g,
    `body.theme-escolar .escolar-special {
    position: relative;
    width: 100vw !important;
    margin-left: calc(-50vw + 50%) !important;
    overflow: hidden;
    background: url('escolar-bg.jpg') center center no-repeat;
    background-size: cover;
    border-bottom: 4px solid var(--amarillo-lapiz);
}
body.theme-escolar .escolar-special::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(10, 15, 36, 0.5); /* Overlay oscuro para resaltar letras */
    z-index: 1;
}`
);

// Make sure the text is above the overlay
css = css.replace(
    /body\.theme-escolar \.titulo-principal \{\s*font-family: 'Fredoka One', cursive;\s*font-size: clamp\(3\.5rem, 10vw, 6\.5rem\);\s*text-align: center;\s*margin: 0;\s*padding: 0;\s*pointer-events: none;\s*color: var\(--amarillo-lapiz\);\s*text-shadow:\s*3px 3px 0px #ffffff,\s*-1px -1px 0px #ffffff,\s*1px -1px 0px #ffffff,\s*-1px 1px 0px #ffffff,\s*1px 1px 0px #ffffff,\s*5px 5px 15px rgba\(0, 0, 0, 0\.8\);\s*position: relative;\s*z-index: 2;\s*\}/g,
    `body.theme-escolar .titulo-principal {
    font-family: 'Fredoka One', cursive;
    font-size: clamp(3.5rem, 10vw, 6.5rem);
    text-align: center;
    margin: 0;
    padding: 0;
    pointer-events: none;
    color: var(--amarillo-lapiz);
    text-shadow: 
        3px 3px 0px #ffffff,
        -1px -1px 0px #ffffff,
        1px -1px 0px #ffffff,
        -1px 1px 0px #ffffff,
        1px 1px 0px #ffffff,
        5px 5px 15px rgba(0, 0, 0, 0.8);
    position: relative;
    z-index: 2;
}`
);

// 3. Revert cards to light theme, but keep the school accent colors
css = css.replace(
    /\/\* Adaptar tarjetas del catálogo al nuevo fondo \*\/[\s\S]*?body\.theme-escolar \.btn-add-cart:hover \{\s*background: #dc2626 !important;\s*\}/g,
    `/* Tarjetas del catálogo estilo Escolar Claro */
body.theme-escolar .catalog-card,
body.theme-escolar .card,
body.theme-escolar .glass-card {
    background: rgba(255, 255, 255, 0.9) !important;
    border: 2px solid rgba(30, 58, 138, 0.1) !important;
    color: var(--texto-oscuro) !important;
}
body.theme-escolar .catalog-card:hover,
body.theme-escolar .card:hover,
body.theme-escolar .glass-card:hover {
    border-color: var(--azul-noche) !important;
    transform: translateY(-5px) !important;
    box-shadow: 0 15px 30px rgba(30, 58, 138, 0.15) !important;
}
body.theme-escolar .catalog-card p,
body.theme-escolar .card p,
body.theme-escolar .glass-card p {
    color: #475569 !important;
}
body.theme-escolar .catalog-card h3,
body.theme-escolar .card h3,
body.theme-escolar .glass-card h3 {
    color: var(--azul-noche) !important;
}
body.theme-escolar .btn-add-cart {
    background: var(--rojo-manzana) !important;
    color: white !important;
}
body.theme-escolar .btn-add-cart:hover {
    background: #dc2626 !important;
}`
);


fs.writeFileSync('styles.css', css);
console.log('Fixed Escolar theme');
