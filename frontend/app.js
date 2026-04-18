const API_URL = 'http://localhost:3000/api';
let currentUser = null;

// AUTO LOGIN
window.onload = () => {
    const savedUser = localStorage.getItem('user');

    if (savedUser) {
        currentUser = JSON.parse(savedUser);

        document.getElementById('login-section').style.display = 'none';
        document.getElementById('app-section').style.display = 'block';
        document.getElementById('welcome-msg').innerText = `${currentUser.username}'s Tasks`;

        loadTasks();
    }
};

// LOGIN
async function login() {
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!username || !email) {
        return alert("Enter username and email");
    }

    const res = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email })
    });

    const data = await res.json();

    if (!data.user_id) {
        alert("Login failed");
        return;
    }

    currentUser = data;

    localStorage.setItem('user', JSON.stringify(currentUser));

    document.getElementById('login-section').style.display = 'none';
    document.getElementById('app-section').style.display = 'block';
    document.getElementById('welcome-msg').innerText = `${currentUser.username}'s Tasks`;

    loadTasks();
}

// LOAD TASKS
async function loadTasks() {
    if (!currentUser) return;

    const res = await fetch(`${API_URL}/tasks/${currentUser.user_id}`);
    const tasks = await res.json();

    const list = document.getElementById('task-list');
    list.innerHTML = '';

    tasks.forEach(task => {
        const div = document.createElement('div');
        div.className = `task-item ${task.status === 'completed' ? 'completed' : ''}`;

        div.innerHTML = `
            <span>${task.task_name}</span>
            <div>
                ${task.status === 'pending' ? `<button class="btn-small btn-complete" onclick="completeTask(${task.task_id})">✓</button>` : ''}
                <button class="btn-small btn-delete" onclick="deleteTask(${task.task_id})">✗</button>
            </div>
        `;

        list.appendChild(div);
    });
}

// ADD TASK
async function addTask() {
    const input = document.getElementById('new-task');
    if (!input.value.trim()) return;

    await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user_id: currentUser.user_id,
            task_name: input.value
        })
    });

    input.value = '';
    loadTasks();
}

// COMPLETE TASK
async function completeTask(taskId) {
    await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: currentUser.user_id })
    });

    loadTasks();
}

// DELETE TASK
async function deleteTask(taskId) {
    await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: currentUser.user_id })
    });

    loadTasks();
}

// LOGOUT
function logout() {
    currentUser = null;
    localStorage.removeItem('user');

    document.getElementById('login-section').style.display = 'block';
    document.getElementById('app-section').style.display = 'none';
}