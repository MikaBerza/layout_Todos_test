import {
  checkLocalStorageForNull,
  returnAnObjectWithDataFromLocalStorage,
  addClassToElement,
  removeClassFromElement,
} from './modules';

import { calcActiveAndCompletedTasks } from './control';

// функция изменяет значение checkbox и класса у элемента списка задач
export default function changeCheckboxAndClassOfTaskListItem() {
  // если localStorage НЕравен null
  if (checkLocalStorageForNull() !== null) {
    // запишем возвращенный объект с данными из localStorage в константу
    const dataset = returnAnObjectWithDataFromLocalStorage();

    // получим нужный DOM элемент по клику
    document.addEventListener('click', (event) => {
      // получим элемент по которому сделали клик
      const clickedElement = event.target;
      // получим (предка - элемент <li> из списка задач) кликнув на checkbox
      // свойство parentNode содержит родительский элемент
      const liElem = clickedElement.parentNode.parentNode;
      // получим элемент (элемент <span> из списка задач) с тестом задачи
      const taskText = clickedElement.previousElementSibling;
      // получим id элемента
      const idElem = liElem.getAttribute('data-id');

      dataset.forEach((item, index) => {
        if (item.id === idElem) {
          // создаем новый объект на основе параметра
          const newItem = { ...item };
          // присваиваем по ключу новое значение
          if (newItem.tick === false) {
            newItem.tick = true;
            // вызываем функцию чтобы добавить класс элементу
            addClassToElement(taskText, 'completed');
          } else if (newItem.tick === true) {
            newItem.tick = false;
            // вызываем функцию чтобы удалить класс у элемента
            removeClassFromElement(taskText, 'completed');
          }
          // заменяем элемент в массиве
          dataset[index] = newItem;
          // преобразует значение JS в строку JSON
          const strDataset = JSON.stringify(dataset);
          // добавляем набор данных в localStorage
          window.localStorage.setItem('keyDataset', strDataset);
        }
      });
      calcActiveAndCompletedTasks();
    });
  }
}
changeCheckboxAndClassOfTaskListItem();
