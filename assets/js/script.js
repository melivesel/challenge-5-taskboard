// Retrieve tasks and nextId from localStorage
const dateInputEl = $('#datepicker');
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    // Generate a timestamp
    const timestamp = new Date().getTime();

    // Generate a random number
    const randomNum = Math.floor(Math.random() * 1000);

    // Combine timestamp and random number to create a unique ID
    const uniqueId = `task_${timestamp}_${randomNum}`;

    return uniqueId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const card = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${task.title}</h5>
                <p class="card-text">${task.description}</p>
                <p class="card-date">${task.date}</p>
                <button class="btn btn-danger">Delete</button>
            </div>
        </div>
    `;

    console.log(card); // Log the card HTML to the console

    // Append the card to a container element
    $('#todo-cards').append(card);

    // Retrieve existing tasks from local storage or initialize an empty array
    let taskList = JSON.parse(localStorage.getItem('tasks')) || [];

    // Ensure taskList is an array
    if (!Array.isArray(taskList)) {
        taskList = [];
    }

    // Add the new task to the tasks array
    taskList.push(task);

    // Store the updated tasks array back in local storage
    localStorage.setItem('tasks', JSON.stringify(taskList));
}


// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();
    
    const title = $('#task-title').val();
    const description = $('#description-text').val();
    const date = dateInputEl.val();
    
    const task = { title, description, date };
    
    createTaskCard(task);
    //clear modal
    $('#task-title').val('');
    $('#description-text').val('');
    $('#datepicker').val('');

    // Close the modal after adding the task
    $('#exampleModal').modal('hide');
}


// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function() {
    $('#exampleModal').modal({ show: false });

    // Open the modal when the "Add Task" button is clicked
    $('#modalButton').on('click', function(event) {
        var modal = $('#exampleModal');
        modal.find('.modal-title').text('Add Task');
        modal.modal('show');

        // Initialize the datepicker
        $('#datepicker').datepicker({
            changeMonth: true,
            changeYear: true,
        });
    });

    // Handle adding a task when the "Add Task" button in the modal is clicked
    $('#addTaskSubmit').on('click', function(event) {
        handleAddTask(event); // Call the handleAddTask function when the button is clicked
    });
    $('#exampleModal').on('click', '#closeButton', function(event) {
        $('#exampleModal').modal('hide');
    })
});