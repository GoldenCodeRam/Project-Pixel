<script lang="ts">
  import { beforeUpdate, onMount } from "svelte";
  import { afterUpdate } from "svelte";
  import Canvas from "../scripts/canvas";
  import Network from "../scripts/network";
  import { SERVER_URL } from "../scripts/network";

  let canvas: HTMLCanvasElement;
  let cursorPosition: HTMLParagraphElement;
  let canvasWrapper: Canvas;
  let color = "#5c3838";
  let colorArray = [];
  let pixels = [];

  const network = new Network();

  // onMount(() => {
  //   network.getPixels();
  //   canvasWrapper = new Canvas(canvas, cursorPosition, colorArray);

  // });

  onMount(async () => {
    canvasWrapper = new Canvas(canvas, cursorPosition, colorArray);
    const res = await fetch(`${SERVER_URL}/getStoredPixels`);
    pixels = await res.json();
    console.log(pixels.values)     
    for (let i = 0; i < pixels.values.length; i++) {
      canvasWrapper.draw(pixels.values[i].pixelX, pixels.values[i].pixelY, [pixels.values[i].r, pixels.values[i].g, pixels.values[i].b, pixels.values[i].a])         
    }
  });

  //After every update, the color is set by the color from the input
  afterUpdate(() => {
    colorArray = hexToRGB(color);
    canvasWrapper._pixelColor = colorArray;
  });

  function createPixelInfo() {
    if (canvasWrapper) {
      console.log(canvasWrapper.savePixel(hexToRGB(color)));
      console.log(hexToRGB(color));
      console.log(color);
      network.sendPixel(canvasWrapper.savePixel(hexToRGB(color)));
    }
  }

  function updatePixelArt() {
    
  }
  //Función para convertir color HEX a rgba
  function hexToRGB(hex) {
    let rgba = [];
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      rgba.push((c >> 16) & 255);
      rgba.push((c >> 8) & 255);
      rgba.push(c & 255);
      rgba.push(1);
      // return "[" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ",1]";
      return rgba;
    }
    throw new Error("Bad Hex");
  }
</script>

<main id="test">
  <div class="hero">
    <p>Select a color</p>
    <p id="cursorPosition" bind:this={cursorPosition}>x: 0, y: 0</p>
    <input type="color" bind:value={color} style="height: 50px;" />
    <div>
      <div style="--theme-color: {color}">
        <canvas width="300px" height="300px" bind:this={canvas} />
      </div>
    </div>
    <button class="button buttonHover" on:click={createPixelInfo}
      >Enviar solicitud para modificar</button
    >
    <button class="button buttonHover" on:click={updatePixelArt}
      >Actualizar obra</button
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
</style>
