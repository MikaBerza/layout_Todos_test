import { displayLocalStorageData } from './modules';
import addTaskToTheList from './enteringNotes';

import {
  changeCheckboxAndClassOfTaskListItem,
  removeFromTheTaskList,
  editTheTaskText,
} from './outputNotes';

import {
  calcActiveAndCompletedTasks,
  searchForItemsInTheList,
  getFilteredItems,
} from './control';

// ___Считываем button для добавления задачи
const buttonElem = document.querySelector('.enteringNotes__buttons-item');
// ___Считываем input для поиска задач
const inpSearchElem = document.querySelector('.search__item');
// ___Считываем элемент select выбора активных и завершенных задач
const selectElem = document.querySelector('.filtering__select');

// После срабатывания события "DOMContentLoaded", переданные внутрь функции выполняется
// Событие DOMContentLoaded происходит, когда браузер разобрал HTML-страницу и составил DOM-дерево
document.addEventListener('DOMContentLoaded', () => {
  // вызовем функцию для вывода (отображения) существующего список задач из локального хранилища
  displayLocalStorageData();
  // вызываем функцию для вычисления активных и завершенных задач
  calcActiveAndCompletedTasks();
});

// событие click возникает каждый раз когда кликнули на элемент <button> левой кнопкой мыши
buttonElem.addEventListener('click', () => {
  // вызываем функцию для добавления задачи в список задач
  addTaskToTheList();
  // вызываем функцию для вычисления активных и завершенных задач
  calcActiveAndCompletedTasks();
});

// после срабатывания события "dblclick" по тексту задачи, переданные внутрь функции выполняется
document.addEventListener('dblclick', (event) => {
  // получим элемент по которому сделали клик
  const clickedElement = event.target;
  // метод contains объекта classList проверяет наличие CSS класса у элемента
  // проверим есть ли у элемента по которому мы кликнули нужный нам класс
  if (clickedElement.classList.contains('outputNotes__list-item-block1-text')) {
    // если есть, то это нужным нам элемент и мы его запишем
    const taskTextElement = clickedElement;
    editTheTaskText(taskTextElement);
  }
});

// после срабатывания события "click" по элементу checkbox, переданные внутрь функции выполняется
document.addEventListener('click', (event) => {
  // получим элемент по которому сделали клик
  const clickedElement = event.target;

  // метод contains объекта classList проверяет наличие CSS класса у элемента
  // проверим есть ли у элемента по которому мы кликнули нужный нам класс
  if (clickedElement.classList.contains('outputNotes__list-item-block1-checkbox')) {
    // если есть, то это нужным нам элемент и мы его запишем
    const checkboxElement = clickedElement;
    // вызываем функцию для изменения checkbox и класса у элемента списка задач
    changeCheckboxAndClassOfTaskListItem(checkboxElement);
    // вызываем функцию для вычисления активных и завершенных задач
    calcActiveAndCompletedTasks();

    // получим текст выбранного пункта списка
    const textOfTheSelectedItem = selectElem.value;
    // вызываем функцию для получения отфильтрованных элементов в списке задач
    getFilteredItems(textOfTheSelectedItem);
  }
});

// после срабатывания события "click" по элементу "Х", переданные внутрь функции выполняется
document.addEventListener('click', (event) => {
  // получим элемент по которому сделали клик
  const clickedElement = event.target;
  // метод contains объекта classList проверяет наличие CSS класса у элемента
  // проверим есть ли у элемента по которому мы кликнули нужный нам класс
  if (clickedElement.classList.contains('outputNotes__list-item-block2-remove')) {
    // если есть, то это нужным нам элемент и мы его запишем
    const crossElement = clickedElement;
    // вызываем функцию для удаления элемента из списка задач
    removeFromTheTaskList(crossElement);
    // вызываем функцию для вычисления активных и завершенных задач
    calcActiveAndCompletedTasks();
  }
});

// событие input возникает каждый раз при вводе нового символа в <input> поисковую строку
inpSearchElem.addEventListener('input', () => {
  // текст поисковой строки переводим в верхний регистр
  const searchStringText = inpSearchElem.value.toUpperCase();
  // вызываем функцию для поиска элементов в списке задач
  searchForItemsInTheList(searchStringText);
});

// событие input возникает каждый раз при изменения значения в <select> сразу после выбора
selectElem.addEventListener('input', () => {
  // получим текст выбранного пункта списка
  const textOfTheSelectedItem = selectElem.value;
  // вызываем функцию для получения отфильтрованных элементов в списке задач
  getFilteredItems(textOfTheSelectedItem);
});
