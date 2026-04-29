const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'public', 'animations', 'robot-mascot.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log("Total layers:", data.layers ? data.layers.length : 0);
console.log("Total assets:", data.assets ? data.assets.length : 0);

if (data.layers) {
  console.log("--- Last 10 Layers ---");
  data.layers.slice(-10).forEach((l, i) => {
    console.log(`Layer ${data.layers.length - 10 + i}: nm="${l.nm}", ty=${l.ty}, ind=${l.ind}`);
  });
  
  console.log("--- First 5 Layers ---");
  data.layers.slice(0, 5).forEach((l, i) => {
    console.log(`Layer ${i}: nm="${l.nm}", ty=${l.ty}, ind=${l.ind}`);
  });
}
