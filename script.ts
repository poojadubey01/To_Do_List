// Define the Task interface
interface Task {
    id: number;
    content: string;
    type: string;
    deadline: string; // The deadline will be a string representing the date
    completed: boolean;
  }
  
  // Class representing the Todo List application
  class TodoListApp {
    private tasks: Task[] = [];
    private addTaskBtn: HTMLButtonElement;
    private taskInput: HTMLInputElement;
    private deadlineInput: HTMLInputElement;
    private taskType: HTMLSelectElement;
    private taskList: HTMLElement;
  
    constructor() {
      this.addTaskBtn = document.getElementById("addTaskBtn") as HTMLButtonElement;
      this.taskInput = document.getElementById("taskInput") as HTMLInputElement;
      this.deadlineInput = document.getElementById("deadlineInput") as HTMLInputElement;
      this.taskType = document.getElementById("taskType") as HTMLSelectElement;
      this.taskList = document.getElementById("taskList")!;
  
      this.addTaskBtn.addEventListener("click", () => this.addTask());
    }
  
    private renderTasks() {
      this.taskList.innerHTML = "";
  
      this.tasks.forEach((task) => {
        const tr = document.createElement("tr");
  
        const taskTd = document.createElement("td");
        taskTd.textContent = task.content;
  
        const deadlineTd = document.createElement("td");
        deadlineTd.textContent = task.deadline;
  
        const typeTd = document.createElement("td");
        typeTd.textContent = task.type;
  
        tr.appendChild(taskTd);
        tr.appendChild(deadlineTd);
        tr.appendChild(typeTd);
  
        this.taskList.appendChild(tr);
      });
    }
  
    private addTask() {
      const taskContent = this.taskInput.value.trim();
      const taskType = this.taskType.value;
      const deadline = this.deadlineInput.value;
  
      if (taskContent !== "" && taskType !== "default") {
        const newTask: Task = {
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
    }
  
    public start() {
      // Load tasks from the JSON file and update the tasks array
      fetch("tasks.json")
        .then((response) => response.json())
        .then((data) => {
          this.tasks = data;
          this.renderTasks();
        })
        .catch((error) => {
          console.error("Error loading tasks:", error);
        });
    }
  }
  
  // Start the application after the DOM has loaded
  document.addEventListener("DOMContentLoaded", () => {
    const todoListApp = new TodoListApp();
    todoListApp.start();
  });
  