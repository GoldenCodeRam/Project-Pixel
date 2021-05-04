import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

app.use(cors());
app.use(express.json());
app.use(express.static('./public'));

app.get('/status', (request, response) => {
  console.log('server ok');
  response.sendStatus(200);
});

app.post('/logging', (request, response) => {
  console.log('New request POST for the logs!');
  console.log(request.body);
  io.emit('serverMessage', request.body);
  response.sendStatus(200);
});

io.on('connection', (socket) => {
  console.log('The frontend is connected!');
});

server.listen(8080, () => {
  console.clear();
  console.log('Logging server listening on port 8080');
});