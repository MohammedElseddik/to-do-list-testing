/**
 * @jest-environment jsdom
 */
import List from '../modules/List.js';

document.body.innerHTML = `
                            <main>
                            <div class="list-container">
                              <header>
                                <div class="task-list">
                                  <p>Today's To Do</p>
                                  <a href="#" class="refresh"><i class="fa-solid fa-rotate"></i></a>
                                </div>
                              </header>

                              <form class="add__task">
                                <input
                                  type="text"
                                  name="add-task"
                                  id="add-task"
                                  class="add-task"
                                  placeholder="Add to your list..."
                                />
                                <button class="add-btn">+</button>
                              </form>

                              <ul class="tasks-body"></ul>
                              <button class="clear-btn">Clear all completed</button>
                            </div>
                            </main>
      `;

describe('addTasks and deleteTasks functions test', () => {
  // test for the addTask methos
  test('test for the addTasks function', () => {
    const list = new List();
    list.addTask('task1');
    list.addTask('task2');
    list.addTask('task3');
    list.addTask('task4');
    list.addTask('task5');
    list.addTask('task6');

    // Select alll the task list elemet
    const taskList = document.querySelectorAll('.tasks-body li');

    // Check if the new task has been pushed to the listObject array
    expect(list.ListObjects.length).toBe(6);

    // Check if the taks added to the UI
    expect(taskList).toHaveLength(6);

    // Check if the lacalstorage is update or it is null
    expect(localStorage.getItem('list')).not.toBeNull();
  });

  test('test the deleteTasks function', () => {
    const list = new List();
    const taskList = document.querySelectorAll('.tasks-body li');
    const trashIcon = document.querySelectorAll('.trash-icon');

    // Delete the first elemet of the list
    list.deleteTask(taskList[0], trashIcon[0]);

    // Delete the second elemet of the list
    list.deleteTask(taskList[0], trashIcon[0]);

    // Check if the tasks removed from the UI
    expect(document.querySelectorAll('.tasks-body li')).toHaveLength(4);

    // Check if the tasks has benn removed form the listObject array
    expect(list.ListObjects.length).toBe(4);

    //  Check if the Local storage is updated or it is null
    expect(localStorage.getItem('list')).not.toBeNull();
  });
});

describe('edit task description, update item status and clear all completed functions', () => {
  // test for the eddit task method
  test('test for the edit task function', () => {
    const list = new List();

    // Sellect all the lask descriptions
    const tasksDescriptions = document.querySelectorAll('.tasks-body li .list-description');

    // Edit the first task
    list.editTask(tasksDescriptions[0], 'edited-task1');

    // Edit the second task
    list.editTask(tasksDescriptions[1], 'edited-task2');

    // Check if the new task has been pushed to the listObject array
    expect(list.ListObjects[0].description).toMatch(/edited/);
    expect(list.ListObjects[1].description).toMatch(/edited/);
  });

  test('check completed tasks', () => {
    const list = new List();

    // Sellect all the checkboxs
    const checkboxs = document.querySelectorAll('.checkbox');

    // Sellect the first checkbox
    const completedTask = checkboxs[0];

    // Set the checked attribute for the first checbox
    completedTask.setAttribute('checked', '');

    // Update the first task completed property to true
    list.completedStausCheck(completedTask);

    // Check if the first task completed has true value
    expect(list.ListObjects[0].completed).toBe(true);

    // Check the second task completed has false value
    expect(list.ListObjects[1].completed).toBe(false);
  });

  test('clear all completed tasks', () => {
    const list = new List();

    // Delete task that has completed property seted to true
    list.clearCompletedTasks();

    // Check if the completed task deleted
    // it should delete one task which has true value for the completed property
    expect(list.ListObjects.length).toBe(3);
  });
});