import lerp from './src/index';

const steps = document.getElementById('steps');
const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const color = document.getElementById('color');
const percent = document.getElementById('percent');
const link = document.querySelector('h1 a');

link.innerHTML = link.innerText
  .split('')
  .map(c => `<span>${c}</span>`)
  .join('');

const linkChars = Array.from(link.querySelectorAll('span'));

function refreshColors() {
  steps.innerHTML = '';
  const c1 = color1.value;
  const c2 = color2.value;

  const stepsCount = 6;
  for (let i = 0; i < stepsCount; i += 1) {
    const color = lerp(c1, c2, i / (stepsCount - 1));
    const div = document.createElement('div');
    div.style.backgroundColor = color;
    steps.appendChild(div);
  }

  color.style.backgroundColor = lerp(c1, c2, Number(percent.value) / 100);

  linkChars.forEach((char, i, chars) => {
    char.style.color = lerp(c1, c2, i / (chars.length - 1));
  });

  link.style.backgroundImage = `linear-gradient(to right, ${c1}, ${c2})`;
}

color1.value = '#00aaaa';
color2.value = '#fd8878';
refreshColors();
color1.addEventListener('change', refreshColors);
color2.addEventListener('change', refreshColors);
percent.addEventListener('change', refreshColors);
percent.addEventListener('input', refreshColors);
