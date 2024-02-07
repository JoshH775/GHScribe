import express from 'express';
import path from 'path';

const app = express();
const port = 5000;

app.get('/', (req, res) => {
    const file = path.resolve(path.dirname(__dirname), 'diary.xlsx');
    res.download(file);
});

app.listen(port, async () => {
    console.log(`Server is running at http://localhost:${port}`);
});