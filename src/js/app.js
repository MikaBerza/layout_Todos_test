import { displayLocalStorageData } from './modules';
import addTaskToTheList from './enteringNotes';
import {
  calcActiveAndCompletedTasks,
  searchForItemsInTheList,
  getFilteredItems,
} from './control';
import changeCheckboxAndClassOfTaskListItem from './outputNotes';

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
  // вызываем функцию для изменения checkbox и класса у элемента списка задач
  changeCheckboxAndClassOfTaskListItem();
});

// событие input возникает каждый раз при вводе нового символа в <input> поисковую строку
inpSearchElem.addEventListener('input', () => {
  // текст поисковой строки переводим в верхний регистр
  const searchStringText = inpSearchElem.value.toUpperCase();
  searchForItemsInTheList(searchStringText);
});

// событие input возникает каждый раз при изменения значения в <select> сразу после выбора
selectElem.addEventListener('input', () => {
  // получим текст выбранного пункта списка
  const textOfTheSelectedItem = selectElem.value;
  getFilteredItems(textOfTheSelectedItem);
});
