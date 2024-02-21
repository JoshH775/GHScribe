import express from 'express';
import path from 'path';
import { diary } from '.';
import cron from 'node-cron';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());


app.get('/api/diary/download', (req, res) => {
    const file = path.resolve(path.dirname(__dirname), 'diary.xlsx');
    res.download(file);
});

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