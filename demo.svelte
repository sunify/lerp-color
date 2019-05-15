<script>
  import eases from "eases";
  import lerp from "./src/index";

  // props
  let stepsCount = 30;

  let colors = ["#41bbe9", "#b710da", "#fd8978"];
  const updateColor = i => e => {
    colors[i] = e.target.value;
  };

  let easing = "linear";
  $: getColor = n =>
    lerp(...colors, Math.max(0, Math.min(1, eases[easing](n))));
  $: steps = Array.from({ length: stepsCount }, (_, i) =>
    getColor(i / (stepsCount - 1))
  );
  const linkText = "@sunify/lerp-color";
  const linkChars = linkText.split("");
</script>

<style>
  :global(html) {
    font-family: Arial, Helvetica, sans-serif;
  }

  :global(body) {
    padding: 4vh 10vw;
    text-align: center;
  }

  a {
    text-decoration: none;
  }

  h1 {
    font-size: 50px;
    margin-bottom: 50px;
    display: inline-block;
    background-color: #ffffff;
    padding: 20px;
  }

  h1 a {
    background-repeat: no-repeat;
    background-size: 100% 4px;
    background-position: 0 100%;
  }

  .steps {
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    width: 100.5vw;
    height: 100%;
    display: flex;
  }

  .steps div {
    flex: 1;
  }

  .pickers {
    display: flex;
    justify-content: space-between;
  }

  .controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px;
  }

  .controls input[type="range"] {
    margin-bottom: 30px;
    width: 50%;
  }
</style>

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

<div class="controls">
  <input type="range" min="3" max="300" bind:value={stepsCount} />
  <select bind:value={easing}>
    {#each Object.keys(eases) as easing}
      <option value={easing}>{easing}</option>
    {/each}
  </select>
</div>
<div class="steps" id="steps">
  {#each steps as step}
    <div style="background-color: {step}" />
  {/each}
</div>
