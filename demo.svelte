<script>
  import lerp from "./src/index";

  // props
  export let stepsCount = 13;

  let colors = ["#41bbe9", "#b710da", "#fd8978"];
  const updateColor = i => e => {
    colors[i] = e.target.value;
  };

  $: steps = Array.from({ length: stepsCount }, (_, i) =>
    lerp(...colors, i / (stepsCount - 1))
  );
  const linkText = "@sunify/lerp-color";
  const linkChars = linkText.split("");

  let percent = 50;
</script>

<h1>
  <a
    href="https://github.com/sunify/lerp-color"
    style="background-image: linear-gradient(to right, {colors.join(', ')})">
    {#each linkChars as char, i}
      <span style="color: {lerp(...colors, i / (linkChars.length - 1))}">
         {char}
      </span>
    {/each}
  </a>
  demo
</h1>

<div class="pickers">
  {#each colors as color, i}
    <input
      type="color"
      class="color-input"
      value={color}
      on:change={updateColor(i)} />
  {/each}
</div>
<div class="steps" id="steps">
  {#each steps as step}
    <div style="background-color: {step}" />
  {/each}
</div>
<div class="color" style="background-color: {lerp(...colors, percent / 100)}">
  <input
    type="range"
    value="0"
    min="0"
    max="100"
    id="percent"
    bind:value={percent} />
</div>
