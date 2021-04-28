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
    console.log(canvasWrapper.savePixel(hexToRGB(color)));
    // console.log(network.sendPixel(canvasWrapper.savePixel(hexToRGB(color))));
    if (canvasWrapper) {
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
  <div>
    <p id="cursorPosition" bind:this={cursorPosition}>0, 0</p>

    <div style="--theme-color: {color}">
      <p style="color: black">Select a color</p>
      <p>(showed here)</p>
    </div>
    <input type="color" bind:value={color} style="height: 50px;" />
    <canvas width="300px" height="300px" bind:this={canvas} />
    <button on:click={createPixelInfo}>Save image</button>
  </div>
</main>

<style lang="scss">
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

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
    }

    p {
      width: 30em;
      margin: 0 0 0.25em 0;
      text-align: left;
      font-family: "Roboto Mono";
      color: var(--theme-color);
    }

    button {
      margin: 1em;
    }
  }
</style>
