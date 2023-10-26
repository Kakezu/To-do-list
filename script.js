const toDoList = document.getElementById("to-do-list")
const addTaskButton = document.getElementById("add-task-button")
const taskInput = document.getElementById("task-input")

// When loading the page, check localStorage for any tasks
window.onload = function() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    for (let i = 0; i < tasks.length; i++) {
        const listHtml = `
        <ul>
            <li id="task-item-${i}">${tasks[i]}</li>
        </ul>`;
        toDoList.innerHTML += listHtml;
    }
 }
 
// Clicking on the task crosses them out
toDoList.addEventListener("click", function (e) {
    if (e.target.id.startsWith("task-item")) {
        e.target.style.textDecoration = "line-through"
    }
})

// Double clicking removes it from the DOM and localStorage
toDoList.addEventListener("dblclick", function(e) {
    if (e.target.id.startsWith("task-item")) {
        // Retrieve tasks from localStorage
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        
        // Find the index of the task in the array
        let index = tasks.indexOf(e.target.innerText);

        // If the task is found in the array
        if (index !== -1) {
            // Remove the task from the array
            tasks.splice(index, 1);
        }

        // Save tasks back to localStorage
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Remove the task from the DOM
        e.target.parentNode.remove();
    }
})


addTaskButton.addEventListener("click", function() {
    
    const listHtml = `
    <ul>
        <li id="task-item">${taskInput.value}</li>
    </ul>`
    if (!taskInput.value == "" && taskInput.value.length >= 3) {
        toDoList.innerHTML += listHtml

        // Retrieve tasks from localStorage
        let tasks = JSON.parse(localStorage.getItem("tasks")) || []
        // Add new task to the array
        tasks.push(taskInput.value)
        // Save tasks back to localStorage
        localStorage.setItem("tasks", JSON.stringify(tasks))
    } else {
        // If the input is empty or less than 3 characters, red border comes in input box and error message below
        taskInput.style.border = "1px solid red"
        const errorPara = document.createElement("p")
        errorPara.classList.add("errorPara")
        errorPara.textContent = "Need to write something over 2 characters!"
        document.getElementById("input-div").appendChild(errorPara)

        // A timeout of 3 seconds showing the error message
        setTimeout(() => {
            document.getElementById("input-div").removeChild(errorPara)
            taskInput.style.border = "1px solid #ddd"
        }, 3000);
    }
    
    taskInput.value = ""
})