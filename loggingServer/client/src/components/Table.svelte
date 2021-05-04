<script lang="ts">
  import type { LogInformation } from "../interfaces/LogInformation";
  export let title: string;
  export let data: Array<LogInformation>;
</script>

<main>
  <h1>{title}</h1>
  <div class="tableContainer">
    <table>
      <tr>
        <th>Level</th>
        <th>Label</th>
        <th>Message</th>
        <th>Timestamp</th>
      </tr>
      {#each data as {level, label, message, timestamp}}
      <tr>
        <th class="message level">{level}</th>
        <th class="message label">{label}</th>
        <th class="message">{message}</th>
        <th class="message timestamp">{timestamp}</th>
      </tr>
      {/each}
    </table>
  </div>
</main>

<style scoped>
  main {
    display: flex;
    flex-direction: column;
    width: 55em;
    border-radius: 15px;
    padding: 1em;
    max-width: 240px;
    margin: 1em auto;
    background: #fafafa;
    box-shadow: 0 5px 10px #aaaaaa;
  }

  h1 {
    margin: 0;
    color: #583d72;
    text-transform: uppercase;
    font-size: 2em;
  }

  th.message {
    font-weight: 400;
  }

  th.message.level {
    width: 5%;
  }
  th.message.label {
    width: 30%;
  }
  th.message.timestamp {
    width: 20%;
  }

  div.tableContainer {
    max-height: 30em;
    overflow: auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
