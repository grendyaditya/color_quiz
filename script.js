// ===== Quiz Logic =====
const targetColorDiv = document.getElementById('targetColor');
const colorOptionsDiv = document.getElementById('colorOptions');
const feedbackDiv = document.getElementById('feedback');
const paletteTipsDiv = document.getElementById('paletteTips');
const nextBtn = document.getElementById('nextBtn');

let targetColor;

function getRandomColor() {
  const r = Math.floor(Math.random()*256);
  const g = Math.floor(Math.random()*256);
  const b = Math.floor(Math.random()*256);
  return { r, g, b, rgb: `rgb(${r}, ${g}, ${b})` };
}

// Generate 3 random colors + target
function generateOptions() {
  const options = [targetColor];
  while (options.length < 4) {
    const color = getRandomColor();
    if (!options.some(c => c.rgb === color.rgb)) options.push(color);
  }
  return options.sort(() => Math.random() - 0.5);
}

function displayOptions() {
  colorOptionsDiv.innerHTML = '';
  const options = generateOptions();
  options.forEach(color => {
    const box = document.createElement('div');
    box.className = "h-24 rounded-lg cursor-pointer transition-transform hover:scale-105 border-2 border-gray-600";
    box.style.backgroundColor = color.rgb;
    box.addEventListener('click', () => checkAnswer(color));
    colorOptionsDiv.appendChild(box);
  });
}

function checkAnswer(selected) {
  if (selected.rgb === targetColor.rgb) {
    feedbackDiv.textContent = "✅ Correct!";
    feedbackDiv.classList.remove('text-red-500');
    feedbackDiv.classList.add('text-green-400');
  } else {
    feedbackDiv.textContent = "❌ Wrong! Try Again.";
    feedbackDiv.classList.remove('text-green-400');
    feedbackDiv.classList.add('text-red-500');
  }
}

function generatePaletteTips(color) {
  paletteTipsDiv.innerHTML = '';

  // Complementary
  const comp = { r: 255-color.r, g: 255-color.g, b: 255-color.b, rgb: `rgb(${255-color.r}, ${255-color.g}, ${255-color.b})` };
  createTipRow('Complementary', [color.rgb, comp.rgb]);

  // Analogous (±30 degrees approx, simplified)
  const analogous1 = { r: Math.min(color.r+30,255), g: color.g, b: color.b, rgb: `rgb(${Math.min(color.r+30,255)}, ${color.g}, ${color.b})` };
  const analogous2 = { r: Math.max(color.r-30,0), g: color.g, b: color.b, rgb: `rgb(${Math.max(color.r-30,0)}, ${color.g}, ${color.b})` };
  createTipRow('Analogous', [analogous1.rgb, color.rgb, analogous2.rgb]);

  // Triadic
  const triad1 = { r: color.r, g: color.g, b: (color.b+85)%256, rgb: `rgb(${color.r}, ${color.g}, ${(color.b+85)%256})` };
  const triad2 = { r: color.r, g: color.g, b: (color.b+170)%256, rgb: `rgb(${color.r}, ${color.g}, ${(color.b+170)%256})` };
  createTipRow('Triadic', [color.rgb, triad1.rgb, triad2.rgb]);
}

function createTipRow(name, colors) {
  const row = document.createElement('div');
  row.className = 'flex items-center space-x-2';
  const label = document.createElement('div');
  label.textContent = name+':';
  label.className = 'w-24 text-sm';
  row.appendChild(label);
  colors.forEach(c => {
    const box = document.createElement('div');
    box.className = 'w-12 h-12 rounded-lg border-2 border-gray-600 flex items-center justify-center text-xs';
    box.style.backgroundColor = c;
    box.textContent = c;
    row.appendChild(box);
  });
  paletteTipsDiv.appendChild(row);
}

// Next Question
function nextQuestion() {
  feedbackDiv.textContent = '';
  targetColor = getRandomColor();
  targetColorDiv.textContent = targetColor.rgb;
  displayOptions();
  generatePaletteTips(targetColor);
}

nextBtn.addEventListener('click', nextQuestion);
nextQuestion();

// ===== RGB Playground Logic =====
const rRange = document.getElementById('rRange');
const gRange = document.getElementById('gRange');
const bRange = document.getElementById('bRange');
const rValue = document.getElementById('rValue');
const gValue = document.getElementById('gValue');
const bValue = document.getElementById('bValue');
const playgroundBox = document.getElementById('playgroundBox');
const rgbCode = document.getElementById('rgbCode');

function updatePlayground() {
  const r = rRange.value;
  const g = gRange.value;
  const b = bRange.value;
  rValue.textContent = r;
  gValue.textContent = g;
  bValue.textContent = b;
  playgroundBox.style.backgroundColor = `rgb(${r},${g},${b})`;
  rgbCode.textContent = `rgb(${r}, ${g}, ${b})`;
}

rRange.addEventListener('input', updatePlayground);
gRange.addEventListener('input', updatePlayground);
bRange.addEventListener('input', updatePlayground);
updatePlayground();
