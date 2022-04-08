/**
 * @jest-environment jsdom
 */
import List from '../modules/List';

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

    // Select alll the task list elemet
    const taskList = document.querySelectorAll('.tasks-body li');

    // Check if the new task has been pushed to the listObject array
    expect(list.ListObjects.length).toBe(4);

    // Check if the taks added to the UI
    expect(taskList).toHaveLength(4);

    // Check if the lacalstorage is update or it is null
    expect(localStorage.getItem('list')).not.toBeNull();
  });
});