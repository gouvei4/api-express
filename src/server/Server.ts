import express from 'express';

const server = express();


server.get('/teste', (_, response) => {
  return response.send('Olá, DEV!');
});

export { server };
