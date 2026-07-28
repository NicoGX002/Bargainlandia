const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

const regexes = [
    /body\.theme-navidad \.global-bg-anim \{[\s\S]*?body\.theme-navidad \.particle \{[^}]*\}/g,
    /body\.theme-juguetes \.global-bg-anim \{[\s\S]*?body\.theme-juguetes \.particle \{[^}]*\}/g,
    /body\.theme-escolar \.global-bg-anim \{[\s\S]*?body\.theme-escolar \.particle \{[^}]*\}/g,
    /body\.theme-vacacional \.global-bg-anim \{[\s\S]*?body\.theme-vacacional \.particle \{[^}]*\}/g,
    /body\.theme-new-year \.global-bg-anim \{[\s\S]*?body\.theme-new-year \.particle \{[^}]*\}/g
];

let matchCount = 0;
regexes.forEach(regex => {
    if (css.match(regex)) {
        matchCount++;
        css = css.replace(regex, '');
    }
});

fs.writeFileSync('styles.css', css);
console.log(`Cleanup complete. Matched and removed ${matchCount} blocks.`);
