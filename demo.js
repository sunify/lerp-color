import lerp from './src/index';

const steps = document.getElementById('steps');
// const color1 = document.getElementById('color1');
// const color2 = document.getElementById('color2');
const color = document.getElementById('color');
const percent = document.getElementById('percent');
const link = document.querySelector('h1 a');
const colors = Array.from(document.querySelectorAll('.color-input'));

link.innerHTML = link.innerText
  .split('')
  .map(c => `<span>${c}</span>`)
  .join('');

const linkChars = Array.from(link.querySelectorAll('span'));

const stepsCount = 13;
const stepsDivs = [];
for (let i = 0; i < stepsCount; i += 1) {
  const div = document.createElement('div');
  stepsDivs.push(div);
  steps.appendChild(div);
}

function refreshColors() {
  const colorValues = colors.map(c => c.value);

  stepsDivs.forEach((step, i) => {
    step.style.backgroundColor = lerp(...colorValues, i / (stepsCount - 1));
  });
  color.style.backgroundColor = lerp(
    ...colorValues,
    Number(percent.value) / 100
  );

  linkChars.forEach((char, i, chars) => {
    char.style.color = lerp(...colorValues, i / (chars.length - 1));
  });

  link.style.backgroundImage = `linear-gradient(to right, ${colorValues.join(
    ', '
  )})`;
}

colors[0].value = '#41bbe9';
colors[1].value = '#b710da';
colors[2].value = '#fd8978';
refreshColors();

colors.forEach(colorInput => {
  colorInput.addEventListener('change', refreshColors);
});
percent.addEventListener('change', refreshColors);
percent.addEventListener('input', refreshColors);
