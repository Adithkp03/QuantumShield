const fs=require('fs');
['src/part6_data.jsx', 'src/part6_component.jsx', 'src/part6.jsx', 'src/part7_data.jsx', 'src/part7_component.jsx', 'src/part7.jsx'].forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/\\`/g, '`').replace(/\\\$\{/g, '${');
  fs.writeFileSync(f, content);
});
