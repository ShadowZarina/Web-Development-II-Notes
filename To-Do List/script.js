window.onload = function() {
    loadTasks();
};

// Helper to retrieve tasks from browser localStorage
function getStoredTasks() {
    const tasks = localStorage.getItem('todo_tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Helper to save tasks to browser localStorage
function saveTasks(tasks) {
    localStorage.setItem('todo_tasks', JSON.stringify(tasks));
}

// 1. Get To Do Task (Active or Inactive)
function loadTasks() {
    const status = document.getElementById('statusFilter').value;
    const taskList = document.getElementById('taskList');
    
    taskList.innerHTML = "<li>Loading tasks...</li>";

    const tasks = getStoredTasks();
    const filteredTasks = tasks.filter(task => task.status === status);

    taskList.innerHTML = "";

    if (filteredTasks.length === 0) {
        taskList.innerHTML = `<li>No ${status} tasks found.</li>`;
        return;
    }

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'todo-task-card';
        li.setAttribute('data-status', task.status);

        const toggleBtnText = task.status === 'active' ? 'Mark Done' : 'Activate';
        const toggleBtnClass = task.status === 'active' ? 'todo-btn-success' : 'todo-btn';

        li.innerHTML = `
            <div class="todo-task-info">
                <h4>${escapeHtml(task.item_name)}</h4>
                <p>${escapeHtml(task.item_description)}</p>
                <div class="todo-task-meta">Status: <b>${task.status}</b> | Modified: ${task.timemodified}</div>
            </div>
            <div class="todo-task-actions">
                <button class="todo-btn ${toggleBtnClass}" onclick="changeStatus(${task.item_id}, '${task.status}')">${toggleBtnText}</button>
                <button class="todo-btn todo-btn-edit" onclick="prepareEdit(${task.item_id}, '${escapeHtml(task.item_name)}', '${escapeHtml(task.item_description)}')">Edit</button>
                <button class="todo-btn todo-btn-danger" onclick="deleteTask(${task.item_id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Handle Add vs Update form routing
function handleFormSubmit(event) {
    event.preventDefault();
    const editId = document.getElementById('edit_item_id').value;
    
    if (editId) {
        updateTask();
    } else {
        addTask();
    }
}

// 2. Add To Do Task
function addTask() {
    const itemName = document.getElementById('item_name').value;
    const itemDesc = document.getElementById('item_description').value;

    const tasks = getStoredTasks();
    const newTask = {
        "item_id": Date.now(),
        "item_name": itemName,
        "item_description": itemDesc,
        "status": "active",
        "timemodified": new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    tasks.push(newTask);
    saveTasks(tasks);

    alert("Item added successfully");
    resetForm();
    loadTasks();
}

// Setup form to edit an existing task
function prepareEdit(id, name, desc) {
    document.getElementById('edit_item_id').value = id;
    document.getElementById('item_name').value = name;
    document.getElementById('item_description').value = desc;
    
    document.getElementById('form-title').innerText = "Edit Task: ";
    document.getElementById('submit-btn').innerText = "Update Task";
    document.getElementById('cancel-btn').style.display = "inline-block";
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 3. Update To Do Task
function updateTask() {
    const itemId = parseInt(document.getElementById('edit_item_id').value);
    const itemName = document.getElementById('item_name').value;
    const itemDesc = document.getElementById('item_description').value;

    let tasks = getStoredTasks();
    tasks = tasks.map(task => {
        if (task.item_id === itemId) {
            task.item_name = itemName;
            task.item_description = itemDesc;
            task.timemodified = new Date().toISOString().slice(0, 19).replace('T', ' ');
        }
        return task;
    });

    saveTasks(tasks);
    alert("Item updated");
    resetForm();
    loadTasks();
}

// 4. Change To Do Task Status
function changeStatus(itemId, currentStatus) {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

    let tasks = getStoredTasks();
    tasks = tasks.map(task => {
        if (task.item_id === itemId) {
            task.status = newStatus;
            task.timemodified = new Date().toISOString().slice(0, 19).replace('T', ' ');
        }
        return task;
    });

    saveTasks(tasks);
    loadTasks();
}

// 5. Delete To Do Task
function deleteTask(itemId) {
    if (!confirm("Are you sure you want to delete this task?")) return;

    let tasks = getStoredTasks();
    tasks = tasks.filter(task => task.item_id !== itemId);

    saveTasks(tasks);
    loadTasks();
}

// Reset form utility
function resetForm() {
    document.getElementById('taskForm').reset();
    document.getElementById('edit_item_id').value = "";
    document.getElementById('form-title').innerText = "Add New Task";
    document.getElementById('submit-btn').innerText = "Add To Do Task";
    document.getElementById('cancel-btn').style.display = "none";
}

// Helper to prevent basic HTML injection in displays
function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}