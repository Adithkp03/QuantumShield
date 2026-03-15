import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');
const parts = ['part1.jsx', 'part2.jsx', 'part3.jsx', 'part4.jsx', 'part5.jsx', 'part6.jsx', 'part7.jsx', 'part7_risk_data.jsx', 'part7_risk.jsx', 'part8.jsx', 'part8_settings.jsx', 'part10_cbom.jsx', 'part11_compliance.jsx', 'part9.jsx'];

let combined = '';
for (const part of parts) {
    const content = fs.readFileSync(path.join(srcDir, part), 'utf8');
    combined += content + '\n\n';
}

fs.writeFileSync(path.join(srcDir, 'App.jsx'), combined);
console.log('App.jsx has been built successfully!');
