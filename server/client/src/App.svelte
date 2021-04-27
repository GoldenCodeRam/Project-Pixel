<script lang="ts">
  import { onMount } from "svelte";
  import Canvas from "./components/canvas";

  export let name: string;

  let canvas: HTMLCanvasElement;
  onMount(() => {
    new Canvas(canvas);
  });
</script>

<main id="test">
  <h1>Hellos {name}!</h1>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>
  <canvas width="300px" height="300px" bind:this={canvas} />
</main>

<style>
  canvas {
    box-shadow: 0 0 10px 0 #00000015;
    left: 50%;
    top: 50%;
    width: 40em;
    height: 40em;
    cursor: crosshair;
    touch-action: none;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
  }

  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
