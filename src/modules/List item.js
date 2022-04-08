const threedot = 'https://cdn.icon-icons.com/icons2/2550/PNG/512/dots_vertical_icon_152628.png';
const trashscr = 'https://img.icons8.com/material/344/trash--v1.png';
export default class ListItem {
  constructor(newTask) {
    this.listItem = newTask;
  }

  render(index) {
    const listLi = document.createElement('li');
    listLi.className = 'list-item';
    listLi.id = index;
    const listLiInput = document.createElement('input');
    listLiInput.className = 'list-description';
    listLiInput.value = this.listItem.description;
    listLiInput.setAttribute('readonly', '');
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'save';
    saveBtn.className = 'save-btn hidden';
    const checkboxIcon = document.createElement('input');
    checkboxIcon.type = 'checkbox';
    checkboxIcon.className = 'checkbox';
    checkboxIcon.id = index + 1;
    const verticalDots = new Image();
    verticalDots.classList = 'vertical-dots-icon';
    verticalDots.id = index;
    verticalDots.src = threedot;
    const trash = new Image();
    trash.src = trashscr;
    trash.id = index;
    trash.className = 'trash-icon hidden';
    listLi.appendChild(checkboxIcon);
    listLi.appendChild(listLiInput);
    listLi.appendChild(saveBtn);
    listLi.appendChild(trash);
    listLi.appendChild(verticalDots);
    return listLi;
  }
}
