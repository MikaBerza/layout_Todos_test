import { displayLocalStorageData } from './modules';
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

// ___Считываем button для добавления задачи
const buttonAddElem = document.querySelector('.entering-task__button-adding');
// ___Считываем input для поиска задач
const inpSearchElem = document.querySelector('.search__item');
// ___Считываем элемент select выбора активных и завершенных задач
const selectElem = document.querySelector('.filtering__select');
// ___Считываем button для установки и снятия всех флажков
const buttonSetCheckboxes = document.querySelector('.entering-task__button-mark');
// ___Считываем button для удаления элементов с отмеченными флажками
const buttonDeletingItemsWithCheckboxes = document.querySelector('.entering-task__button-clearing');
// ___Считываем textarea
const textareaElem = document.querySelector('.entering-task__textarea-item');

// После срабатывания события "DOMContentLoaded", переданные внутрь функции выполняется
// Событие DOMContentLoaded происходит, когда браузер разобрал HTML-страницу и составил DOM-дерево
document.addEventListener('DOMContentLoaded', () => {
  // вызовем функцию для вывода (отображения) существующего список задач из локального хранилища
  displayLocalStorageData();
  // вызываем функцию для вычисления активных и завершенных задач
  calcActiveAndCompletedTasks();

  // обрабатываем событие двойного нажатия на элемент <li> для входа в режим редактирования
  const listItem = document.querySelectorAll('.output-task__list-item');
  for (let i = 0; i < listItem.length; i += 1) {
    // навешиваем на каждый элемент обработчик события
    // после срабатывания события "dblclick", переданные внутрь функции выполняется
    listItem[i].addEventListener('dblclick', (event) => {
      // получим элемент по которому сделали клик
      const clickedElement = event.currentTarget;
      // получим элемент с текстом задачи
      const listItemText = clickedElement.closest('.output-task__list-item').querySelector('.output-task__list-item-block1-text');
      // вызываем функцию для редактирования текста задачи
      editTheTaskText(listItemText);
    });
  }
});

// обрабатывать добавление или редактирование текста щелчком мыши и нажатием клавиши
const handleAddOrEditTextOnClickAndKeydown = () => {
  if (buttonAddElem.textContent === 'Добавить') {
    // вызываем функцию для добавления задачи в список задач
    addTaskToTheList();
    // вызываем функцию для вычисления активных и завершенных задач
    calcActiveAndCompletedTasks();
    // получим текст выбранного пункта списка
    const textOfTheSelectedItem = selectElem.value;
    // вызываем функцию для получения отфильтрованных элементов в списке задач
    getFilteredItems(textOfTheSelectedItem);
  } else if (buttonAddElem.textContent === 'Редактировать') {
    // вызываем функцию для замены задачи в списке задач при редактировании
    replaceTaskToTheListWhenEditing();
    // вызываем функцию для вычисления активных и завершенных задач
    calcActiveAndCompletedTasks();
  }
};
// добавление или редактирование текста щелчком мыши и нажатием клавиши Enter
buttonAddElem.addEventListener('click', handleAddOrEditTextOnClickAndKeydown);
textareaElem.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && textareaElem.value.trim().length !== 0) {
    handleAddOrEditTextOnClickAndKeydown();
    // отменяем действие по умолчанию для события keydown,
    // тем самым поле textarea возвращается в исходное положение, а не висит в ожидании ввода текста
    event.preventDefault();
  }
});

// выход из режима редактирования задачи нажатием клавиши Escape
textareaElem.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && buttonAddElem.textContent === 'Редактировать') {
    // вызываем функцию для возвращения старой задачи
    returnAnOldTask();
    // вызываем функцию для вычисления активных и завершенных задач
    calcActiveAndCompletedTasks();
  }
});

// событие click возникает каждый раз когда кликнули на элемент <button> левой кнопкой мыши
buttonSetCheckboxes.addEventListener('click', () => {
  // получим список элементов документа, которые соответствуют указанной группе селекторов
  const nodeListCheckElem = document.querySelectorAll('.output-task__list-item-block1-checkbox');
  const nodeListTaskTextElem = document.querySelectorAll('.output-task__list-item-block1-text');
  // вызываем функцию для установки или снятия всех флажков
  checkAndTakeOfAllCheckboxes(nodeListCheckElem, nodeListTaskTextElem);
  // вызываем функцию для вычисления активных и завершенных задач
  calcActiveAndCompletedTasks();
});

// событие click возникает каждый раз когда кликнули на элемент <button> левой кнопкой мыши
buttonDeletingItemsWithCheckboxes.addEventListener('click', () => {
  // вызываем функцию для удаления элементов с отмеченными флажками
  deletingItemsWithCheckboxes();
  // вызываем функцию для вычисления активных и завершенных задач
  calcActiveAndCompletedTasks();
});

// после срабатывания события "click" по элементу checkbox, переданные внутрь функции выполняется
document.addEventListener('click', (event) => {
  // получим элемент по которому сделали клик
  const clickedElement = event.target;

  // метод contains объекта classList проверяет наличие CSS класса у элемента
  // проверим есть ли у элемента по которому мы кликнули нужный нам класс
  if (clickedElement.classList.contains('output-task__list-item-block1-checkbox')) {
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
  if (clickedElement.classList.contains('output-task__list-item-block2-remove')) {
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
  // устанавливаем отдельный пункт списка <option> c тестом 'все' в <select>
  selectElem.value = selectElem.options[0].value;
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
