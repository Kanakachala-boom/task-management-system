const db = require('../config/db');

exports.getTasks = (req, res) => {
    const { user_id } = req.params;
    db.all(`SELECT * FROM Tasks WHERE user_id = ? ORDER BY status DESC, task_id ASC`, [user_id], (err, tasks) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(tasks);
    });
};

exports.addTask = (req, res) => {
    const { user_id, task_name } = req.body;
    db.run(`INSERT INTO Tasks (user_id, task_name, status) VALUES (?, ?, 'pending')`, 
    [user_id, task_name], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Task added", task_id: this.lastID });
    });
};

exports.completeTask = (req, res) => {
    const { task_id } = req.params;
    const { user_id } = req.body; 
    db.run(`UPDATE Tasks SET status = 'completed' WHERE task_id = ? AND user_id = ?`, 
    [task_id, user_id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Task updated" });
    });
};

exports.deleteTask = (req, res) => {
    const { task_id } = req.params;
    const { user_id } = req.body; 
    db.run(`DELETE FROM Tasks WHERE task_id = ? AND user_id = ?`, 
    [task_id, user_id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Task deleted" });
    });
};