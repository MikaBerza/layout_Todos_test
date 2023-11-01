import {
  displayLocalStorageData,
  searchForElementInsideTheCreatedMarkup,
} from './modules';

import {
  addTaskToTheList,
  returnAnOldTask,
  replaceTaskToTheListWhenEditing,
  checkAndTakeOfAllCheckboxes,
  deletingItemsWithCheckboxes,
} from './enteringTask';

import {
  editTheTaskText,
  changeCheckboxAndClassOfTaskListItem,
  removeFromTheTaskList,
} from './outputTask';

import {
  searchForItemsInTheList,
  calcActiveAndCompletedTasks,
  getFilteredItems,
} from './control';

const bodyElem = document.querySelector('body');
const buttonAddElem = document.querySelector('.entering-task__button-adding');
const inpSearchElem = document.querySelector('.search__item');
const selectElem = document.querySelector('.filtering__select');
const buttonSetCheckboxes = document.querySelector('.entering-task__button-mark');
const buttonDeletingItemsWithCheckboxes = document.querySelector('.entering-task__button-clearing');
const textareaElem = document.querySelector('.entering-task__textarea-item');
const ulElem = document.querySelector('.output-task__list');

// функция обрабатывать добавление или редактирование текста щелчком мыши и нажатием клавиши
const handleAddOrEditTextOnClickAndKeydown = () => {
  if (buttonAddElem.textContent === 'Добавить') {
    addTaskToTheList();
    calcActiveAndCompletedTasks();
    getFilteredItems(selectElem.value);
  } else if (buttonAddElem.textContent === 'Редактировать') {
    replaceTaskToTheListWhenEditing();
    calcActiveAndCompletedTasks();
  }
};

// После срабатывания события "DOMContentLoaded", переданные внутрь функции выполняется
// Событие DOMContentLoaded происходит, когда браузер разобрал HTML-страницу и составил DOM-дерево
document.addEventListener('DOMContentLoaded', () => {
  displayLocalStorageData();
  calcActiveAndCompletedTasks();
});

// добавление или редактирование текста щелчком мыши и нажатием клавиши Enter
buttonAddElem.addEventListener('click', handleAddOrEditTextOnClickAndKeydown);
bodyElem.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && textareaElem.value.trim().length !== 0) {
    handleAddOrEditTextOnClickAndKeydown();
    event.preventDefault();
  }
});

// выход из режима редактирования задачи нажатием клавиши Escape
bodyElem.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && buttonAddElem.textContent === 'Редактировать') {
    returnAnOldTask();
    calcActiveAndCompletedTasks();
  }
});

// после срабатывания события "dblclick" по тексту задачи, переданные внутрь функции выполняется
ulElem.addEventListener('dblclick', (event) => {
  const foundElement = searchForElementInsideTheCreatedMarkup(event.target);

  if (foundElement !== null && foundElement.className === 'output-task__list-item-block1-text') {
    editTheTaskText(foundElement);
  }
});

// после срабатывания события "click" по элементу checkbox или "Х", функции выполняется
ulElem.addEventListener('click', (event) => {
  const foundElement = searchForElementInsideTheCreatedMarkup(event.target);

  if (foundElement !== null && foundElement.className === 'output-task__list-item-block1-checkbox') {
    changeCheckboxAndClassOfTaskListItem(event.target);
    getFilteredItems(selectElem.value);
  } else if (foundElement !== null && foundElement.className === 'output-task__list-item-block2-remove') {
    removeFromTheTaskList(event.target);
  }

  calcActiveAndCompletedTasks();
});

// событие click возникает каждый раз когда кликнули на элемент <button> левой кнопкой мыши
buttonSetCheckboxes.addEventListener('click', () => {
  const nodeListCheckElem = document.querySelectorAll('.output-task__list-item-block1-checkbox');
  const nodeListTaskTextElem = document.querySelectorAll('.output-task__list-item-block1-text');

  checkAndTakeOfAllCheckboxes(nodeListCheckElem, nodeListTaskTextElem);
  calcActiveAndCompletedTasks();
});

// событие click возникает каждый раз когда кликнули на элемент <button> левой кнопкой мыши
buttonDeletingItemsWithCheckboxes.addEventListener('click', () => {
  deletingItemsWithCheckboxes();
  calcActiveAndCompletedTasks();
});

// событие input возникает каждый раз при вводе нового символа в <input> поисковую строку
inpSearchElem.addEventListener('input', () => {
  selectElem.value = selectElem.options[0].value;
  searchForItemsInTheList(inpSearchElem.value.toUpperCase());
});

// событие input возникает каждый раз при изменения значения в <select> сразу после выбора
selectElem.addEventListener('input', () => {
  getFilteredItems(selectElem.value);
});
