<script lang="ts">
  import Table from './components/Table.svelte';
  import type { LogInformation } from './interfaces/LogInformation';
  import { socket } from './model/network';

  let leaderServerLogs: Array<LogInformation> =[];
  let server1Logs: Array<LogInformation> = [];
  let server2Logs: Array<LogInformation> = [];
  let server3Logs: Array<LogInformation> = [];

  socket.connect();
  socket.on('serverMessage', (message) => {
    if (message.label.indexOf('8081') > 0) {
      leaderServerLogs = [...leaderServerLogs, message];
    } else if (message.label.indexOf('8082') > 0) {
      server1Logs = [...server1Logs, message];
    } else if (message.label.indexOf('8083') > 0) {
      server2Logs = [...server2Logs, message];
    } else if (message.label.indexOf('8084') > 0) {
      server3Logs = [...server3Logs, message];
    }
  });
</script>

<main>
	<h1>Logging Server</h1>
  <h2>Project Pixel</h2>
  <div class="tables">
    <Table
      title='Leader Server 🤴'
      data={leaderServerLogs}
    ></Table>
    <Table
      title='Server 🤖 1'
      data={server1Logs}
    ></Table>
    <Table
      title='Server 🤖 2'
      data={server2Logs}
    ></Table>
    <Table
      title='Server 🤖 3'
      data={server3Logs}
    ></Table>
  </div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
    margin: 1em 1em 0 1em;
		color: #ff8474;
		text-transform: uppercase;
		font-size: 2em;
	}

  h2 {
    margin: 0;
    padding: 0;
    color: #9f5f80;
    font-size: 1.5em;
  }

  div.tables {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>