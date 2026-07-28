const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// Replace Title and Subtitle
css = css.replace(
    /#findeano-special \.cinematic-title \{[\s\S]*?#findeano-special \.cinematic-subtitle span \{[\s\S]*?\}/g,
    `#findeano-special .cinematic-title {
    font-family: 'Playfair Display', serif;
    font-weight: 900;
    font-style: normal;
    font-size: clamp(3.5rem, 9vw, 6.5rem);
    text-align: center;
    margin: 20px 0 10px 0;
    pointer-events: none;
    
    color: #FFD700;
    /* Contraste nítido sin sombra difusa que apague el color */
    text-shadow: 2px 2px 0px #000, 4px 4px 0px rgba(0,0,0,0.5);
}

#findeano-special .cinematic-subtitle {
    display: block;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(1.2rem, 2.5vw, 2rem);
    text-align: center;
    font-weight: 700;
    color: #ffffff;
    text-shadow: 2px 2px 0px #000;
    margin: 0;
}
#findeano-special .cinematic-subtitle span {
    color: #FFD700;
}`
);

// Replace Theme Base
css = css.replace(
    /body\.theme-new-year \{\s*--primary: #ffd700; --secondary: #c0c0c0; --dark-bg: #111111; --glass-border: rgba\(255, 215, 0, 0\.4\);\s*\}/g,
    `body.theme-new-year {
  --primary: #ffd700; --secondary: #c0c0c0; --dark-bg: #111111; --glass-border: rgba(255, 215, 0, 0.4);
  background: #0a0f24 !important; /* Azul oscuro elegante/negro para contraste */
  color: #ffffff !important;
}

/* Adaptar tarjetas del catálogo a modo oscuro festivo */
body.theme-new-year .catalog-card,
body.theme-new-year .card {
    background: rgba(255, 255, 255, 0.05) !important;
    backdrop-filter: blur(10px) !important;
    border: 1px solid rgba(255, 215, 0, 0.3) !important;
    color: #ffffff !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5) !important;
}
body.theme-new-year .catalog-card:hover,
body.theme-new-year .card:hover {
    border-color: #FFD700 !important;
    transform: translateY(-5px) !important;
    box-shadow: 0 15px 40px rgba(255, 215, 0, 0.2) !important;
}
body.theme-new-year .catalog-card p,
body.theme-new-year .card p {
    color: #dddddd !important;
}
body.theme-new-year .catalog-card h3,
body.theme-new-year .card h3 {
    color: #FFD700 !important;
}`
);

fs.writeFileSync('styles.css', css);
console.log('Update complete');
