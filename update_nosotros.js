const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// 1. Update New Year theme to apply to .glass-card as well
css = css.replace(
    /body\.theme-new-year \.catalog-card,\s*body\.theme-new-year \.card \{/g,
    `body.theme-new-year .catalog-card,
body.theme-new-year .card,
body.theme-new-year .glass-card {`
);

css = css.replace(
    /body\.theme-new-year \.catalog-card:hover,\s*body\.theme-new-year \.card:hover \{/g,
    `body.theme-new-year .catalog-card:hover,
body.theme-new-year .card:hover,
body.theme-new-year .glass-card:hover {`
);

css = css.replace(
    /body\.theme-new-year \.catalog-card p,\s*body\.theme-new-year \.card p \{/g,
    `body.theme-new-year .catalog-card p,
body.theme-new-year .card p,
body.theme-new-year .glass-card p {`
);

css = css.replace(
    /body\.theme-new-year \.catalog-card h3,\s*body\.theme-new-year \.card h3 \{/g,
    `body.theme-new-year .catalog-card h3,
body.theme-new-year .card h3,
body.theme-new-year .glass-card h3 {`
);

// 2. Append base styles for Nosotros section
const nosotrosStyles = `
/* ================= SECCIÓN NOSOTROS ================= */
.nosotros-content {
    background: rgba(255, 255, 255, 0.7);
    border: 2px solid var(--primary);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    color: var(--text-dark, #333);
}

.nosotros-subtitle {
    font-size: 2.2rem;
    color: var(--primary);
    text-transform: uppercase;
    font-weight: 800;
    margin-bottom: 1.5rem;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

.nosotros-text {
    font-size: 1.25rem;
    line-height: 1.8;
    color: inherit;
    margin-bottom: 1.2rem;
    font-weight: 500;
}
`;

css += nosotrosStyles;

fs.writeFileSync('styles.css', css);
console.log('Update complete');
