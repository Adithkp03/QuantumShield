const fs=require('fs');
['src/part8_data.jsx', 'src/part8_component.jsx', 'src/part8.jsx'].forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/\\`/g, '`').replace(/\\\$\{/g, '${').replace(/\\\\n/g, '\\n');
  fs.writeFileSync(f, content);
});
