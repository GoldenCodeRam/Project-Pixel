<script lang="ts">
  import { onMount } from "svelte";
  import Canvas from "../scripts/canvas";
  import Network from "../scripts/network";

  let canvas: HTMLCanvasElement;
  let cursorPosition: HTMLParagraphElement;
  let canvasWrapper: Canvas | undefined;

  const network = new Network();

  onMount(() => {
    canvasWrapper = new Canvas(canvas, cursorPosition);
  });

  function saveImage() {
    if (canvasWrapper) {
      canvasWrapper.save((blob: Blob) => {
        network.sendImage(blob);
      });
    }
  }
</script>

<main id="test">
  <div>
    <p bind:this={cursorPosition}>0, 0</p>
    <canvas width="300px" height="300px" bind:this={canvas} />
    <button on:click="{saveImage}">Save image</button>
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
      font-family: 'Roboto Mono';
    }

    button {
      margin: 1em;
    }
  }
</style>
