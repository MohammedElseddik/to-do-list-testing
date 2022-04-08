import NewTask from './NewTask.js';
import ListItem from './List item.js';

export default class List {
  constructor() {
    this.ListObjects = localStorage.getItem('list') === null ? [] : JSON.parse(localStorage.getItem('list'));
  }

  newItem() {
    const addTaskInput = document.querySelector('.add-task').value;
    const listform = document.querySelector('.add__task');
    if (addTaskInput.trim().length === 0) return;
    this.addTask(addTaskInput);
    listform.reset();
  }

  addTask(inputValue) {
    this.ListObjects.push(new NewTask(inputValue, false));
    localStorage.setItem('list', JSON.stringify(this.ListObjects));
    this.render();
  }

  selectTaskFeature(event, listLi, verticalDotsIcon, trashIcon) {
    if (event.target.classList.contains('list-description')) {
      listLi.classList.toggle('selected');
      trashIcon.classList.toggle('hidden');
      event.target.toggleAttribute('readonly');
      event.target.addEventListener('keyup', () => {
        const inputValue = event.target.value;
        this.editTask(event.target, inputValue);
      });
    } else if (event.target.classList.contains('trash-icon')) {
      this.deleteTask(listLi, trashIcon);
    } else if (event.target.classList.contains('checkbox')) {
      this.completedStausCheck(event.target);
    }
  }

  deleteTask(listLi, trashIcon) {
    this.ListObjects.splice(trashIcon.id, 1);
    listLi.remove();
    localStorage.setItem('list', JSON.stringify(this.ListObjects));
    this.render();
  }

  editTask(eventTarget, inputValue) {
    this.ListObjects[parseInt(eventTarget.parentElement.id, 10)].description = inputValue;
    localStorage.setItem('list', JSON.stringify(this.ListObjects));
  }

  completedStausCheck(clickedBox) {
    console.log(clickedBox);
    if (clickedBox.checked) {
      this.ListObjects[parseInt(clickedBox.id, 10) - 1].completed = true;
      clickedBox.parentElement.classList.add('line');
    } else {
      this.ListObjects[parseInt(clickedBox.id, 10) - 1].completed = false;
      clickedBox.parentElement.classList.remove('line');
    }

    localStorage.setItem('list', JSON.stringify(this.ListObjects));
    this.checkboxsStatus(clickedBox);
    // return clickedBox;
    // const checkboxs = document.querySelectorAll('.checkbox');
    // checkboxs.forEach((element) => {
    //   // localStorage.setItem(checkboxs[index].id, checkboxs[i].checked);
    //   element.addEventListener('change', () => {
    //     /* eslint-disable */
    //             for (const listObject of taskArray) {
    //                 if (element.checked) {
    //                     taskArray[parseInt(element.id) - 1].completed = true;
    //                     element.parentElement.classList.add('line');
    //                 } else {
    //                     taskArray[parseInt(element.id) - 1].completed = false;
    //                     element.parentElement.classList.remove('line');
    //                 }
    //             }
    //             localStorage.setItem('list', JSON.stringify(this.ListObjects));
    //         });
    //     })
    //     this.checkboxsStatus(checkboxs);
    // return checked;
  }

  checkboxsStatus() {
    // console.log('hello')
    // if (this.ListObjects[parseInt(clickedBox.id) - 1].completed === true) {
    //           clickedBox.setAttribute('checked', '');
    //           clickedBox.parentElement.classList.add('line');
    //       } else if (this.ListObjects[parseInt(clickedBox.id) - 1].completed === false) {
    //           clickedBox.removeAttribute('checked', '');
    //           clickedBox.parentElement.classList.remove('line');
    //       }
    const checkboxs = document.querySelectorAll('.checkbox');
    /* eslint-disable */
        for (const item of this.ListObjects) {
            if (item.completed === true) {
                checkboxs[item.index - 1].setAttribute('checked', '');
                checkboxs[item.index - 1].parentElement.classList.add('line');
            } else if (item.completed === false) {
                checkboxs[item.index - 1].removeAttribute('checked', '');
                checkboxs[item.index - 1].parentElement.classList.remove('line');
            }
        }
        this.clearCompletedTasks();
  }

  clearCompletedTasks() {
        const clearBtn = document.querySelector('.clear-btn');
        clearBtn.addEventListener('click', () => {
            this.ListObjects = this.ListObjects.filter((item) => {
                return item.completed === false;
            })
            localStorage.setItem('list', JSON.stringify(this.ListObjects));
            this.render();
        })
  }

  deleteAllTasks() {
        const deleteAllBtn = document.querySelector('.refresh');
        deleteAllBtn.addEventListener('click', (event) => {
            event.preventDefault();
            this.ListObjects = [];
            localStorage.setItem('list', JSON.stringify(this.ListObjects));
            this.render();
        })
  }

  render() {
        const listBody = document.querySelector('.tasks-body');
        listBody.innerHTML = '';
        /* eslint-disable */
        for (const [i, listObject] of this.ListObjects.entries()) {
            listObject.index = i + 1;
            const listItem = new ListItem(listObject);
            const listLi = listItem.render(i);
            listBody.appendChild(listLi);
            const verticalDotsIcon = listLi.querySelector('.vertical-dots-icon');
            const trashIcon = listLi.querySelector('.trash-icon');
            listLi.addEventListener('click', (event) => { this.selectTaskFeature(event, listLi, verticalDotsIcon, trashIcon) });
            localStorage.setItem('list', JSON.stringify(this.ListObjects));
        }
  }

}