const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];

app.get('/tasks', (req, res) => res.json(tasks));
app.post('/tasks', (req, res) => {
    tasks.push(req.body);
    res.status(201).json(req.body);
});
app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(task => task.id !== req.params.id);
    res.status(200).send();
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));