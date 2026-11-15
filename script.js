// ==================================
// ACADEMIC PLANNER
// ==================================

let tasks = JSON.parse(localStorage.getItem("studentTasks")) || [];

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

// Save tasks in the browser
function saveTasks() {
    localStorage.setItem("studentTasks", JSON.stringify(tasks));
}

// Display tasks on the page
function displayTasks() {
    if (!taskList) return;

    taskList.innerHTML = "";

    if (emptyMessage) {
        emptyMessage.style.display = tasks.length === 0 ? "block" : "none";
    }

    tasks.forEach(function(task) {
        const li = document.createElement("li");

        const details = document.createElement("span");
        details.textContent = task.name + " - Due: " + task.date;

        if (task.completed) {
            details.style.textDecoration = "line-through";
        }

        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.style.background = "#168aad";
        completeButton.style.color = "white";

        completeButton.addEventListener("click", function() {
            task.completed = !task.completed;
            saveTasks();
            displayTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.background = "#d9534f";
        deleteButton.style.color = "white";

        deleteButton.addEventListener("click", function() {
            tasks = tasks.filter(function(item) {
                return item.id !== task.id;
            });

            saveTasks();
            displayTasks();
        });

        li.appendChild(details);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

// Add a new task
if (taskForm) {
    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const newTask = {
            id: Date.now(),
            name: taskInput.value.trim(),
            date: taskDate.value,
            completed: false
        };

        if (!newTask.name || !newTask.date) {
            alert("Please enter a task and due date.");
            return;
        }

        tasks.push(newTask);

        saveTasks();
        displayTasks();

        taskForm.reset();
    });
}

displayTasks();


// ==================================
// CONTACT FORM VALIDATION
// ==================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();
        const formMessage = document.getElementById("formMessage");

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\d+$/;

        if (!name || !email || !phone || !message) {
            formMessage.textContent = "Please fill in all fields.";
            formMessage.style.color = "red";
            return;
        }

        if (!emailPattern.test(email)) {
            formMessage.textContent = "Please enter a valid email address.";
            formMessage.style.color = "red";
            return;
        }

        if (!phonePattern.test(phone)) {
            formMessage.textContent = "Phone number must contain digits only.";
            formMessage.style.color = "red";
            return;
        }

        formMessage.textContent = "Your form has been validated successfully!";
        formMessage.style.color = "green";

        contactForm.reset();
    });
}