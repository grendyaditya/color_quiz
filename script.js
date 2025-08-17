const targetColorDiv = document.getElementById('targetColor');
const colorOptionsDiv = document.getElementById('colorOptions');
const feedbackDiv = document.getElementById('feedback');
const paletteTipDiv = document.getElementById('paletteTip');
const nextBtn = document.getElementById('nextBtn');

let targetColor;

function getRandomColor() {
  const r = Math.floor(Math.random()*256);
  const g = Math.floor(Math.random()*256);
  const b = Math.floor(Math.random()*256);
  return { r, g, b, rgb: `rgb(${r}, ${g}, ${b})` };
}

// Generate options: target + 3 random colors
function generateOptions() {
  const options = [targetColor];
  while (options.length < 4) {
    const color = getRandomColor();
    if (!options.some(c => c.rgb === color.rgb)) {
      options.push(color);
    }
  }
  // Shuffle
  options.sort(() => Math.random() - 0.5);
  return options;
}

// Display color boxes
function displayOptions() {
  colorOptionsDiv.innerHTML = '';
  const options = generateOptions();
  options.forEach(color => {
    const box = document.createElement('div');
    box.className = "h-24 rounded-lg cursor-pointer transition-transform hover:scale-105";
    box.style.backgroundColor = color.rgb;
    box.addEventListener('click', () => checkAnswer(color));
    colorOptionsDiv.appendChild(box);
  });
}

// Check user answer
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

// Generate new question
function nextQuestion() {
  feedbackDiv.textContent = '';
  targetColor = getRandomColor();
  targetColorDiv.textContent = targetColor.rgb;

  // Simple tips untuk belajar kombinasi warna
  paletteTipDiv.textContent = `Tip: Complementary color could be rgb(${255-targetColor.r}, ${255-targetColor.g}, ${255-targetColor.b})`;
  
  displayOptions();
}

// Event
nextBtn.addEventListener('click', nextQuestion);

// Init first question
nextQuestion();
