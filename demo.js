import lerp from './src/index';

const steps = document.getElementById('steps');
const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const color = document.getElementById('color');
const percent = document.getElementById('percent');
const link = document.querySelector('h1 a');
const titleChars = Array.from(link.querySelectorAll('h1 span'));

function refreshColors() {
  steps.innerHTML = '';
  const c1 = color1.value;
  const c2 = color2.value;

  for (let i = 0; i <= 5; i += 1) {
    const color = lerp(c1, c2, i / 5);
    const div = document.createElement('div');
    div.style.backgroundColor = color;
    steps.appendChild(div);
  }

  color.style.backgroundColor = lerp(c1, c2, Number(percent.value) / 100);

  titleChars.forEach((char, i, chars) => {
    char.style.color = lerp(c1, c2, i / (chars.length - 1));
  });

  link.style.backgroundImage = `linear-gradient(to right, ${
    link.querySelector('span:first-child').style.color
  }, ${link.querySelector('span:last-child').style.color})`;
}

color1.value = '#00aaaa';
color2.value = '#fd8878';
refreshColors();
color1.addEventListener('change', refreshColors);
color2.addEventListener('change', refreshColors);
percent.addEventListener('change', refreshColors);
percent.addEventListener('input', refreshColors);
