const fs = require('fs');

// 1. UPDATE STYLES.CSS SSS
let css = fs.readFileSync('styles.css', 'utf8');

const newMadreCSS = `
/* ================= DÍA DE LA MADRE ================= */
body.theme-madre {
    --amarillo-col: #f6c700; 
    --azul-col: #003c8f;
    --rojo-col: #da291c;
    --crema: #fdfbf7;
    --texto-oscuro: #2d1b1b;
    --blanco: #ffffff;
    background: var(--crema) !important;
    color: var(--texto-oscuro) !important;
    font-family: 'Montserrat', sans-serif !important;
}

body.theme-madre .header-nav, 
body.theme-madre .navbar-top, 
body.theme-madre .navbar {
    background: rgba(253, 251, 247, 0.95) !important;
    backdrop-filter: blur(10px) !important;
    border-bottom: 4px solid var(--amarillo-col) !important;
}

body.theme-madre .navbar .nav-links a {
    color: var(--azul-col) !important;
    font-weight: 700 !important;
    transition: color 0.3s ease !important;
}
body.theme-madre .navbar .nav-links a:hover { color: var(--rojo-col) !important; }

body.theme-madre .navbar .logo {
    font-family: 'Fredoka One', cursive !important;
    color: var(--rojo-col) !important;
    font-size: 1.8rem !important;
}

body.theme-madre .titulo-mama {
    font-family: 'Fredoka One', cursive;
    font-size: clamp(3rem, 8vw, 5.5rem);
    text-align: center;
    color: var(--rojo-col);
    text-shadow: 3px 3px 0px var(--amarillo-col), 6px 6px 10px rgba(0,0,0,0.2);
    margin: 0 0 20px 0;
    padding: 0;
    pointer-events: none;
    line-height: 1.2;
}

body.theme-madre .subtitulo-mama {
    font-family: 'Lobster', cursive;
    font-size: 1.8rem;
    text-align: center;
    color: var(--azul-col);
    margin-bottom: 40px;
}

body.theme-madre .grid-frases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    padding: 0 5% 10vh 5%;
    max-width: 1300px;
    margin: 0 auto;
}

body.theme-madre .tarjeta-frase {
    background: var(--blanco) !important;
    border-radius: 25px !important;
    padding: 25px 20px !important;
    border-left: 8px solid var(--amarillo-col) !important;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08) !important;
    text-align: center !important;
    transition: all 0.4s ease !important;
    position: relative;
}

body.theme-madre .tarjeta-frase:hover {
    transform: translateY(-10px) scale(1.02) !important;
    border-left-color: var(--rojo-col) !important;
    box-shadow: 0 15px 35px rgba(218, 41, 28, 0.15) !important;
}

body.theme-madre .tarjeta-frase i {
    position: absolute;
    top: -15px;
    right: 15px;
    font-size: 2rem;
    color: var(--amarillo-col);
    background: var(--blanco);
    padding: 5px 10px;
    border-radius: 50%;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

body.theme-madre .texto-frase {
    font-size: 1.1rem;
    font-weight: 600;
    line-height: 1.6;
    color: var(--texto-oscuro);
    font-style: italic;
    position: relative;
    z-index: 1;
}

body.theme-madre .cinematic-title,
body.theme-madre .cinematic-subtitle,
body.theme-madre .scroll-down-hint,
body.theme-madre .seasonal-logo-icon {
    display: none !important;
}
`;

// Remove old body.theme-madre if exists and append new
css = css.replace(/body\.theme-mujer, body\.theme-madre \{[\s\S]*?body\.theme-mujer \.particle, body\.theme-madre \.particle \{[^}]*\}/g, '');
css += "\n" + newMadreCSS;
fs.writeFileSync('styles.css', css);


// 2. UPDATE SEASON-ENGINE.JS
let js = fs.readFileSync('js/season-engine.js', 'utf8');

const madreHTML = `
<div style="text-align: center; padding: 15vh 15px 2vh 15px;">
    <h1 class="titulo-mama">¡Feliz Día de la Madre!</h1>
    <p class="subtitulo-mama"><i class="fa-solid fa-heart" style="color: var(--rojo-col);"></i> El recetario de Mamá Colombia <i class="fa-solid fa-heart" style="color: var(--rojo-col);"></i></p>
</div>

<div class="grid-frases">
    <div class="tarjeta-frase"><i class="fa-solid fa-ear-listen"></i><p class="texto-frase">"Le entra por un oído y le sale por el otro."</p></div>
    <div class="tarjeta-frase"><i class="fa-solid fa-clock"></i><p class="texto-frase">"Cuando tenga hijos, se acordará de mí."</p></div>
    <div class="tarjeta-frase"><i class="fa-solid fa-face-smile-wink"></i><p class="texto-frase">"Usted verá."</p></div>
    <div class="tarjeta-frase"><i class="fa-solid fa-location-dot"></i><p class="texto-frase">"Búsqueme, que me va a encontrar."</p></div>
    <div class="tarjeta-frase"><i class="fa-solid fa-people-group"></i><p class="texto-frase">"Si un amigo suyo se tira de un balcón, ¿usted también?"</p></div>
    <div class="tarjeta-frase"><i class="fa-solid fa-utensils"></i><p class="texto-frase">"En la casa hay sopa."</p></div>
    <div class="tarjeta-frase"><i class="fa-solid fa-comments"></i><p class="texto-frase">"Más tarde hablamos."</p></div>
    <div class="tarjeta-frase"><i class="fa-solid fa-stopwatch"></i><p class="texto-frase">"Cuento hasta 3 y voy en 2."</p></div>
    <div class="tarjeta-frase"><i class="fa-solid fa-history"></i><p class="texto-frase">"En mi época no había eso."</p></div>
    <div class="tarjeta-frase"><i class="fa-solid fa-tshirt"></i><p class="texto-frase">"Mejor lo visto antes que alimentarlo."</p></div>
    <div class="tarjeta-frase"><i class="fa-solid fa-broom"></i><p class="texto-frase">"La casa no se va a limpiar sola."</p></div>
    <div class="tarjeta-frase"><i class="fa-solid fa-cow"></i><p class="texto-frase">"Pa' qué cría cola la vaca."</p></div>
    <div class="tarjeta-frase"><i class="fa-solid fa-house"></i><p class="texto-frase">"Mientras usted viva bajo este techo, aquí se hace lo que YO diga."</p></div>
    <div class="tarjeta-frase"><i class="fa-solid fa-face-angry"></i><p class="texto-frase">"Y si yo lo encuentro, ya sabe qué pasa."</p></div>
    <div class="tarjeta-frase"><i class="fa-solid fa-language"></i><p class="texto-frase">"¿En qué idioma le tengo que hablar?"</p></div>
    <div class="tarjeta-frase"><i class="fa-solid fa-bird"></i><p class="texto-frase">"Los pájaros tirándoles a las escopetas"</p></div>
    <div class="tarjeta-frase"><i class="fa-solid fa-ring"></i><p class="texto-frase">"No se le olvide que primero fue su mamá que ese noviecit@ suyo"</p></div>
</div>`;

const replacementString = `"madre": { title: "", subtitle: "", class: "madre-special", extraHTML: \`${madreHTML}\` },\n    "escolar": { title: "", subtitle: "", class: "escolar-special",`;

// Insert madre object into intros
if (!js.includes('"madre": {')) {
    js = js.replace(
        /"escolar": \{ title: "", subtitle: "", class: "escolar-special",/g,
        replacementString
    );
}

fs.writeFileSync('js/season-engine.js', js);
console.log('Update madre theme complete');
