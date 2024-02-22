import express from 'express';
import path from 'path';
import { diary } from '.';
import cron from 'node-cron';
import cors from 'cors';
import { getData } from './sheets';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use(express.static('./client/build'))

app.get('/api/diary/download', (req, res) => {
    const file = path.resolve(path.dirname(__dirname), 'diary.xlsx');
    res.download(file);
});

app.get('/api/diary', (req, res) => {
    console.log('GET /api/diary');
    res.json(getData())
})

app.post('/api/diary', (req, res) => {
    diary();
    res.status(204);
    res.send('Diary updated');
})

app.listen(port, async () => {
    console.log(`Server is running at http://localhost:${port}`);
});


cron.schedule('34 19 * * *', () => {
    diary();
  }, {
    timezone: "Etc/GMT"
  });