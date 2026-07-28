const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// Remove the display:none rule for #temporada in the escolar theme
css = css.replace(
    /\/\* Ocultar catálogos predeterminados \*\/\s*body\.theme-escolar #temporada \{\s*display: none;\s*\}/g,
    ''
);

fs.writeFileSync('styles.css', css);
console.log('Removed display:none from #temporada in theme-escolar');
