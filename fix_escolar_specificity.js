const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// The problematic old rule:
// #escolar-special { background: radial-gradient(circle at center, #2e3b32 0%, #0b140e 100%); border-bottom: 2px solid #ffd700; }
// We can just remove it to clean things up
css = css.replace(
    /#escolar-special \{ background: radial-gradient\(circle at center, #2e3b32 0%, #0b140e 100%\); border-bottom: 2px solid #ffd700; \}\s*#escolar-special \.cinematic-title \{ color: #ffd700; font-family: 'Nunito', sans-serif; font-style: normal; \}/g,
    ''
);

// And update the class selector to ID selector to ensure high specificity
css = css.replace(
    /body\.theme-escolar \.escolar-special \{/g,
    `body.theme-escolar #escolar-special {`
);

css = css.replace(
    /body\.theme-escolar \.escolar-special::before \{/g,
    `body.theme-escolar #escolar-special::before {`
);

fs.writeFileSync('styles.css', css);
console.log('Fixed specificity for escolar-special');
