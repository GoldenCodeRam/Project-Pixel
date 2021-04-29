<script lang="ts">
  import { onMount } from "svelte";
  import { afterUpdate } from "svelte";
  import Canvas from "../scripts/canvas";
  import Network from "../scripts/network";

  let canvas: HTMLCanvasElement;
  let cursorPosition: HTMLParagraphElement;
  let canvasWrapper: Canvas | undefined;
  let color = "#ff3e00";

  const network = new Network();

  onMount(() => {
    canvasWrapper = new Canvas(canvas, cursorPosition, color);
  });

  //After every update, the color is set by the color from the input
  afterUpdate(() => {
    canvasWrapper._pixelColor = color;
  });

  function createPixelInfo() {
    if (canvasWrapper) {
      console.log(canvasWrapper.savePixel(hexToRGB(color)));
      network.sendPixel(canvasWrapper.savePixel(hexToRGB(color)));
    }
  }
  //Función para convertir color HEX a rgba
  function hexToRGB(hex) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      return "[" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ",1]";
    }
    throw new Error("Bad Hex");
  }
</script>

<main id="test">
  <div class="hero">
    <p>Select a color</p>
    <p id="cursorPosition" bind:this={cursorPosition}>x: 0, y: 0</p>
    <input type="color" bind:value={color} style="height: 50px;" />
    <div class="components">
      <div class="left-side" style="--theme-color: {color}">
        <canvas width="300px" height="300px" bind:this={canvas} />
      </div>
      <div class="right-side">
        <div class="title">
          <h1>LOGS</h1>
        </div>
        <div class="logs">
          
        </div>
      </div>
    </div>
    <button class="button buttonHover" on:click={createPixelInfo}
      >Send request to modify</button
    >
  </div>
</main>

<style lang="css">
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  canvas {
    box-shadow: 0 0 10px 0 #00000015;
    left: 50%;
    top: 50%;
    width: 30em;
    height: 30em;
    cursor: crosshair;
    touch-action: none;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
    border: 1px solid #000;
  }

  p {
    width: 30em;
    margin: 0 0 0.25em 0;
    text-align: left;
    font-family: "Roboto Mono";
    color: var(--theme-color);
    text-align: center;
  }

  .components {
    flex-direction: row;
    justify-content: space-between;
    width: 100vh;
  }

  button {
    margin: 1em;
  }

  .button {
    background-color: #4caf50; /* Green */
    border: none;
    color: white;
    padding: 16px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 30px;
    transition-duration: 0.4s;
    cursor: pointer;
  }

  .buttonHover {
    background-color: white;
    color: black;
    border: 2px solid #4caf50;
  }

  .buttonHover:hover {
    background-color: #4caf50;
    color: white;
  }
  .right-side {
    width: 30em;
    height: 30em;
    border: 1px solid #000;
    overflow-y: scroll;
    background-color: rgb(255, 255, 255);
  }

  .title {
    margin-top: -400px;
    color: rgb(11, 17, 200);
  }

  .logs {
    margin-top: -400px;
    color: rgb(11, 17, 200);
  }
</style>
