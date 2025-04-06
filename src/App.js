import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/tasks')
             .then(res => setTasks(res.data));
    }, []);

    const addTask = () => {
        const task = { id: Date.now().toString(), text: newTask, complete: false };
        axios.post('http://localhost:5000/tasks', task)
             .then(() => setTasks([...tasks, task]));
        setNewTask('');
    };

    const deleteTask = (id) => {
        axios.delete(`http://localhost:5000/tasks/${id}`)
             .then(() => setTasks(tasks.filter(task => task.id !== id)));
    };

    return (
        <div>
            <h1>TaskTracker</h1>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter a task"
            />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.text}
                        <button onClick={() => deleteTask(task.id)}>✓</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;