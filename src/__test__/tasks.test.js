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