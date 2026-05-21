// Base Configuration URL - Swap with your live render/railway URL for deployment!
const API_BASE_URL = "http://127.0.0.1:8000"; 

// Authentication Router Hook
async function handleAuth(endpoint) {
    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;

    if (!usernameInput || !passwordInput) {
        alert("Please completely fill out both forms.");
        return;
    }

    try {
        let response;
        if (endpoint === 'register') {
            response = await fetch(`${API_BASE_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: usernameInput, password: passwordInput })
            });
            if(response.ok) alert("Registration complete! You can log in now.");
        } else {
            // Login relies on standard URLEncoded form parameters
            const formData = new URLSearchParams();
            formData.append("username", usernameInput);
            formData.append("password", passwordInput);

            response = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                body: formData
            });
            
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.access_token);
                localStorage.setItem("username", usernameInput);
                showWorkspace();
            }
        }
        if (!response.ok) {
            const err = await response.json();
            alert(`Error: ${err.detail || "Action Failed"}`);
        }
    } catch (e) {
        alert("Connection failure to the api application.");
    }
}

function showWorkspace() {
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("workspace-section").style.display = "block";
    document.getElementById("user-display").innerText = `Logged in as: ${localStorage.getItem("username")}`;
    fetchTasks();
}

function logout() {
    localStorage.clear();
    document.getElementById("auth-section").style.display = "block";
    document.getElementById("workspace-section").style.display = "none";
}

// Fetch and Dynamic Render Engine
async function fetchTasks() {
    const token = localStorage.getItem("token");
    const filterValue = document.getElementById("status-filter").value;
    
    let url = `${API_BASE_URL}/tasks?limit=50&offset=0`;
    if(filterValue === "completed") url += "&completed=true";
    if(filterValue === "pending") url += "&completed=false";

    const response = await fetch(url, {
        headers: { "Authorization": `Bearer ${token}` }
    });

    if (response.ok) {
        const tasks = await response.json();
        const container = document.getElementById("task-list");
        container.innerHTML = "";

        tasks.forEach(task => {
            const taskDiv = document.createElement("div");
            taskDiv.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskDiv.innerHTML = `
                <div>
                    <strong class="title">${task.title}</strong>
                    <p style="margin:4px 0 0 0; font-size:14px; color:#666;">${task.description || ''}</p>
                </div>
                <div class="task-buttons">
                    ${!task.completed ? `<button class="btn-success" onclick="toggleComplete(${task.id}, true)">✓</button>` : ''}
                    <button class="btn-danger" onclick="deleteTask(${task.id})">✗</button>
                </div>
            `;
            container.appendChild(taskDiv);
        });
    }
}

async function createTask() {
    const title = document.getElementById("task-title").value;
    const description = document.getElementById("task-desc").value;
    const token = localStorage.getItem("token");

    if(!title) return alert("Task title required!");

    await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, description })
    });
    
    document.getElementById("task-title").value = "";
    document.getElementById("task-desc").value = "";
    fetchTasks();
}

async function toggleComplete(id, status) {
    const token = localStorage.getItem("token");
    await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ completed: status })
    });
    fetchTasks();
}

async function deleteTask(id) {
    const token = localStorage.getItem("token");
    await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
    });
    fetchTasks();
}

// Auto-login persistence hook on page refresh
if (localStorage.getItem("token")) {
    showWorkspace();
}