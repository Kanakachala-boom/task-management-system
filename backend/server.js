console.log("SERVER FILE RUNNING");
const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ ADD HERE
app.get('/', (req, res) => {
    res.send('Backend is running 🚀');
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Start server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
setInterval(() => {}, 1000);