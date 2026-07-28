const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

const regexSubtitle = /\.nosotros-subtitle\s*\{[^}]*\}/g;
const newSubtitle = `.nosotros-subtitle {
    font-family: 'Montserrat', sans-serif;
    font-size: 2.8rem;
    color: var(--primary);
    text-transform: uppercase;
    font-weight: 800;
    margin-bottom: 1.5rem;
    text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
    letter-spacing: 1px;
}`;

const regexText = /\.nosotros-text\s*\{[^}]*\}/g;
const newText = `.nosotros-text {
    font-family: 'Nunito', sans-serif;
    font-size: 1.45rem;
    line-height: 1.8;
    color: inherit;
    margin-bottom: 1.5rem;
    font-weight: 600;
}`;

css = css.replace(regexSubtitle, newSubtitle);
css = css.replace(regexText, newText);

fs.writeFileSync('styles.css', css);
console.log('Fonts updated successfully');
