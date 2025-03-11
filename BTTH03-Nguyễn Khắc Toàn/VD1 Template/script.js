function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Vui lòng nhập công việc!");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = `<span onclick="toggleComplete(this)">${taskText}</span>
                    <button class='delete' onclick="deleteTask(this)">Xóa</button>`;

    document.getElementById("taskList").appendChild(li);
    taskInput.value = "";

    saveTasksToLocalStorage(); // Lưu danh sách sau khi thêm
}


function deleteTask(button) {
    button.parentElement.remove(); // Xóa công việc khỏi danh sách
    saveTasksToLocalStorage(); // Cập nhật Local Storage
}


function toggleComplete(task) {
    task.parentElement.classList.toggle("completed");
    saveTasksToLocalStorage(); // Lưu lại trạng thái
}
function saveTasksToLocalStorage() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        let taskText = li.querySelector("span").innerText;
        let isDone = li.classList.contains("completed");
        tasks.push({ text: taskText, isDone: isDone });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasksFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `<span onclick="toggleComplete(this)">${task.text}</span>
                        <button class='delete' onclick="deleteTask(this)">Xóa</button>`;

        if (task.isDone) {
            li.classList.add("completed"); // Đánh dấu nếu công việc đã hoàn thành
        }

        document.getElementById("taskList").appendChild(li);
    });
}
document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);


