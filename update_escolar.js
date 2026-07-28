const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// Replace .titulo-principal
css = css.replace(
    /body\.theme-escolar \.titulo-principal \{[\s\S]*?body\.theme-escolar \.subtitulo-tienda \{/g,
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
}

body.theme-escolar .subtitulo-tienda {`
);

// Replace .subtitulo-tienda
css = css.replace(
    /body\.theme-escolar \.subtitulo-tienda \{[\s\S]*?body\.theme-escolar \.fondo-escolar \{/g,
    `body.theme-escolar .subtitulo-tienda {
    font-family: 'Quicksand', sans-serif;
    font-weight: 700;
    font-size: clamp(1.2rem, 3vw, 2rem);
    color: #ffffff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
    margin-top: 15px;
    position: relative;
    z-index: 2;
}

body.theme-escolar .subtitulo-tienda i {
    color: var(--amarillo-lapiz);
}

/* Background image wrapper for the section */
body.theme-escolar .escolar-special {
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
    background: rgba(30, 58, 138, 0.6); /* Azul noche semi transparente para oscurecer y dar contraste */
    z-index: 0;
}

body.theme-escolar .fondo-escolar {`
);

// Replace .fondo-escolar position
css = css.replace(
    /body\.theme-escolar \.fondo-escolar \{\s*position: fixed;/g,
    `body.theme-escolar .fondo-escolar {\n    position: absolute;`
);

fs.writeFileSync('styles.css', css);
console.log('Update Escolar CSS complete');
