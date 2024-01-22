import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.post('/api/diary', (req: Request, res: Response) => {
  res.send('Hello World!');
});




