// Class representing the Todo List application
var TodoListApp = /** @class */ (function () {
    function TodoListApp() {
        var _this = this;
        this.tasks = [];
        this.addTaskBtn = document.getElementById("addTaskBtn");
        this.taskInput = document.getElementById("taskInput");
        this.deadlineInput = document.getElementById("deadlineInput");
        this.taskType = document.getElementById("taskType");
        this.taskList = document.getElementById("taskList");
        this.addTaskBtn.addEventListener("click", function () { return _this.addTask(); });
    }
    TodoListApp.prototype.renderTasks = function () {
        var _this = this;
        this.taskList.innerHTML = "";
        this.tasks.forEach(function (task) {
            var tr = document.createElement("tr");
            var taskTd = document.createElement("td");
            taskTd.textContent = task.content;
            var deadlineTd = document.createElement("td");
            deadlineTd.textContent = task.deadline;
            var typeTd = document.createElement("td");
            typeTd.textContent = task.type;
            tr.appendChild(taskTd);
            tr.appendChild(deadlineTd);
            tr.appendChild(typeTd);
            _this.taskList.appendChild(tr);
        });
    };
    TodoListApp.prototype.addTask = function () {
        var taskContent = this.taskInput.value.trim();
        var taskType = this.taskType.value;
        var deadline = this.deadlineInput.value;
        if (taskContent !== "" && taskType !== "default") {
            var newTask = {
                id: this.tasks.length + 1,
                content: taskContent,
                type: taskType,
                deadline: deadline,
                completed: false,
            };
            this.tasks.push(newTask);
            this.taskInput.value = "";
            this.deadlineInput.value = "";
            this.taskType.value = "default";
            this.renderTasks();
        }
    };
    TodoListApp.prototype.start = function () {
        var _this = this;
        // Load tasks from the JSON file and update the tasks array
        fetch("tasks.json")
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.tasks = data;
            _this.renderTasks();
        })
            .catch(function (error) {
            console.error("Error loading tasks:", error);
        });
    };
    return TodoListApp;
}());
// Start the application after the DOM has loaded
document.addEventListener("DOMContentLoaded", function () {
    var todoListApp = new TodoListApp();
    todoListApp.start();
});
