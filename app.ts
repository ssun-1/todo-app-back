'use strict'
const express = require('express');
const pgp = require('pg-promise')(/* options */)
const cors = require('cors');
const app = express();
const port = 3000;

const db = pgp('postgres://postgres:testappdata@localhost:5432/todoapp');
app.use(cors());
app.use(express.json());

app.post('/create_todo', (req, res) => {
    console.log(req.body)
    const result = req.body.todo_name;
    db.none('INSERT INTO todos (todo_name) VALUES ($1)', [result])
    if (result) {
        res.status(200).json({ message: 'Task added successfully!' });
    } else {
        res.status(400).json({ message: 'Task name is required' });
    }
}
);

app.get('/get_todos', (req, res) => {
    db.any('SELECT * FROM todos')
    .then((data) => {
        res.json(data)
    })
    
  });

app.put('/update_todo/:id', (req, res) => {
    const todoId = req.params.id;
    const newName = req.body.todo_name;

    db.none('UPDATE todos SET todo_name = $1 WHERE todo_id = $2', [newName, todoId])
        .then(() => {
            res.status(200).json({ message: 'Task updated successfully!' });
        })
        .catch(error => {
            console.error('Error updating task:', error);
            res.status(500).json({ message: 'An error occurred while updating the task' });
        });
});

app.delete('/delete_todo/:id', (req, res) => {
    const todoId = parseInt(req.params.id, 10);
    db.none('DELETE FROM todos WHERE todo_id = $1', [todoId])
        .then(() => {
            res.status(200).json({ message: 'Task deleted successfully!' });
        })
        .catch(error => {
            console.error('Error deleting task:', error);
            res.status(500).json({ message: 'Error deleting task' });
        });
});

if (process.env.NODE_ENV !== 'test') {
    const server = app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}

module.exports = {"app": app, "db": db};