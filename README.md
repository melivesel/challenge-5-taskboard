# challenge-5-taskboard
# Description

This was supposed to be a task board where you could create a task with an attached date, and then move it to columns to indicate whether it was to do, in progress, or done. Unfortunately I've broken it so bad I can't even get the part I have currently committed to work on my local machine, the only thing that is working is what I have attached here. 

# Usage

You can add your task, and it will log to the local storage, but it won't pick it up and display it so you have to look at the devtools or remember I guess. 

https://melivesel.github.io/challenge-5-taskboard/


# Code that at one point worked but now doesn't
// Retrieve tasks and nextId from localStorage
const dateInputEl = $('#datepicker');
const taskDisplayEl = $('#task-display');
let taskList = JSON.parse(localStorage.getItem('tasks'));
// Todo: create a function to generate a unique task id

function readTasksFromStorage() {
    console.log('Retrieved tasks from localStorage:', tasks);

    if (taskList === null) {
        taskList = []; // Initialize taskList as an empty array if 'tasks' key is not found
    }
    return taskList;
}
function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>')
        .addClass('card task draggable my-3')
        .attr('data-task-id', task.id);
    const cardBody = $('<div>')
        .addClass('card-body');
    const cardTitle = $('<h3>')
        .addClass('card-text')
        .text(task.title);
    const cardDescription = $('<p>')
        .addClass('card-text')
        .text(task.description);
    const cardDueDate = $('<p>')
        .addClass('card-text')
        .text(task.date); 
    const cardDeleteBtn = $('<button>')
        .addClass('btn btn-danger delete')
        .text('Delete')
        .attr('data-task-id', task.id); 
    cardDeleteBtn.on('click', handleDeleteTask);

    if (task.date && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.Date, 'DD/MM/YYYY');
    
        // ? If the task is due today, make the card yellow. If it is overdue, make it red.
        if (now.isSame(taskDueDate, 'day')) {
          taskCard.addClass('bg-warning text-white');
        } else if (now.isAfter(taskDueDate)) {
          taskCard.addClass('bg-danger text-white');
          cardDeleteBtn.addClass('border-light');
        }
      }
    // Append card elements to the card body
    cardBody.append(cardTitle, cardDescription, cardDueDate, cardDeleteBtn);
    taskCard.append(cardBody);

    // Append the card to the container element
    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const tasks = readTasksFromStorage();
    const todoList = $('#todo-cards');
    // Clear the existing task cards before re-rendering
    todoList.empty();

    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();
  
    const doneList = $('#done-cards');
    doneList.empty();
  
    // Loop through each task in the task list and create a card for each task
    for (let task of tasks) {
        if (task.status === 'to-do') {
          todoList.append(createTaskCard(task));
        } else if (task.status === 'in-progress') {
          inProgressList.append(createTaskCard(task));
        } else if (task.status === 'done') {
          doneList.append(createTaskCard(task));
        }
      }
    

    // Make the newly added task cards draggable
    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
        helper: function (e) {
            const original = $(e.target).hasClass('ui-draggable')
                ? $(e.target)
                : $(e.target).closest('.ui-draggable');
            return original.clone().css({
                width: original.outerWidth(),
            });
        },
    });
}

function handleDeleteTask() {
    const taskId = $(this).attr('data-task-id');
    const tasks = readTasksFromStorage();

    // Filter out the task with the matching ID
    tasks = tasks.filter(task => task.id !== taskId);

    // Update tasks in local storage
    saveTasksToStorage(tasks);
    renderTaskList();
}
// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();
    
    const taskTitle = $('#task-title').val().trim();
    const taskDescription = $('#description-text').val().trim();
    const date = dateInputEl.val();
    
    const newTask = { 
        title: taskTitle,
        description: taskDescription, 
        date: date, 
        status: "to-do",
    };
    const tasks= readTasksFromStorage();
    tasks.push(newTask);
    console.log(newTask);
    saveTasksToStorage(tasks);
    renderTaskList();
    //clear modal
    $('#task-title').val('');
    $('#description-text').val('');
    $('#datepicker').val('');

    // Close the modal after adding the task
    $('#exampleModal').modal('hide');
}
// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const tasks = readTasksFromStorage();
    const taskIdE1 = ui.draggable[0].dataset.taskId;
    const newStatus =event.target.id;
    for (let task of tasks) {
        if (task.id === taskIdE1) {
          task.status = newStatus;
        }
      }
      localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function() {
    renderTaskList();

    $('#exampleModal').modal({ show: false });
   

    // Open the modal when the "Add Task" button is clicked
    $('#modalButton').on('click', function(event) {
        var modal = $('#exampleModal');
        modal.find('.modal-title').text('Add Task');
        modal.modal('show');
        console.log('click');

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
    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
      });
});

# Credits
UT EdX course materials
ExPert Learning Assistant
https://getbootstrap.com/docs/4.0/components/modal/
