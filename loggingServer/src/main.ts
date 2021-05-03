import express from 'express';

const app = express();

app.use(express.json());

app.get('/logging', (request, response) => {
  console.log('New request for the logs!');
});

app.post('/logging', (request, response) => {
  console.log('New request for the logs!');
});

app.listen(3000, () => {
  console.clear();
  console.log('Logging server listening on port 3000');
});