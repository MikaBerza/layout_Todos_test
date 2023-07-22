import {
  checkLocalStorageForNull,
  returnAnObjectWithDataFromLocalStorage,
  addClassToElement,
  removeClassFromElement,
} from './modules';

// функция для редактирования текста задачи
export function editTheTaskText(taskTextElement) {
  // проверим строку с данными из localStorage на null (отсутствие значения)
  if (checkLocalStorageForNull() !== null) {
    // ___Считываем <button> для добавления задачи
    const buttonElem = document.querySelector('.enteringTask__buttons-itemAdding');
    // ___Считываем элемент <textarea>
    const textareaElem = document.querySelector('.enteringTask__textarea-item');

    // запишем возвращенный объект с данными из localStorage в константу
    const dataset = returnAnObjectWithDataFromLocalStorage();
    // получим прародители элемент <li> из списка задач
    // свойство parentNode содержит родительский элемент
    const liElem = taskTextElement.parentNode.parentNode;
    // получим родителя элемент <ul>
    const ulElem = liElem.parentElement;
    // получим id элемента <li>
    const idElem = liElem.getAttribute('data-id');

    dataset.forEach((item, index) => {
      if (item.id === idElem && item.tick !== true) {
        // создаем новый объект на основе параметра
        const newItem = { ...item };
        if (newItem.editing === false) {
          // присваиваем новое значение
          newItem.editing = true;
          // выводим в <textarea> редактируемую запись
          textareaElem.value = newItem.note;

          // вызываем функцию чтобы добавить класс элементу
          addClassToElement(ulElem, 'dn');
          // изменяем название кнопки
          buttonElem.textContent = 'Редактировать';
        }
        // заменяем элемент в массиве
        dataset[index] = newItem;
        // преобразует значение JS в строку JSON
        const strDataset = JSON.stringify(dataset);
        // добавляем набор данных в localStorage
        window.localStorage.setItem('keyDataset', strDataset);
      }
    });
  }
}

// функция изменяет значение checkbox и класса у элемента списка задач
export function changeCheckboxAndClassOfTaskListItem(checkboxElement) {
  // проверим строку с данными из localStorage на null (отсутствие значения)
  if (checkLocalStorageForNull() !== null) {
    // запишем возвращенный объект с данными из localStorage в константу
    const dataset = returnAnObjectWithDataFromLocalStorage();
    // получим прародители элемент <li> из списка задач
    // свойство parentNode содержит родительский элемент
    const liElem = checkboxElement.parentNode.parentNode;
    // получим (элемент <span> из списка задач) с тестом задачи
    const taskTextElem = checkboxElement.previousElementSibling;
    // получим id элемента <li>
    const idElem = liElem.getAttribute('data-id');

    dataset.forEach((item, index) => {
      if (item.id === idElem) {
        // создаем новый объект на основе параметра
        const newItem = { ...item };
        if (newItem.tick === false) {
          // присваиваем новое значение
          newItem.tick = true;
          // вызываем функцию чтобы добавить класс элементу
          addClassToElement(taskTextElem, 'completed');
        } else if (newItem.tick === true) {
          newItem.tick = false;
          // вызываем функцию чтобы удалить класс у элемента
          removeClassFromElement(taskTextElem, 'completed');
        }
        // заменяем элемент в массиве
        dataset[index] = newItem;
        // преобразует значение JS в строку JSON
        const strDataset = JSON.stringify(dataset);
        // добавляем набор данных в localStorage
        window.localStorage.setItem('keyDataset', strDataset);
      }
    });
  }
}

// функция для удаления элемента из списка задач
export function removeFromTheTaskList(crossElement) {
  // проверим строку с данными из localStorage на null (отсутствие значения)
  if (checkLocalStorageForNull() !== null) {
    // запишем возвращенный объект с данными из localStorage в константу
    const dataset = returnAnObjectWithDataFromLocalStorage();
    // получим прародители элемент <li> из списка задач
    // свойство parentNode содержит родительский элемент
    const liElem = crossElement.parentNode.parentNode;
    // получим id элемента <li>
    const idElem = liElem.getAttribute('data-id');

    /* Метод findIndex() возвращает индекс первого найденного в массиве элемента,
    который подходит под условие переданной функции,
    если же ни одного подходящего элемента не найдётся, то метод вернёт -1 */
    const elementIndex = dataset.findIndex((item) => item.id === idElem);
    if (elementIndex !== -1) {
      // удаляем объект из массива(localStorage) по индексу
      dataset.splice(elementIndex, 1);
      // удаляем элемент из DOM
      liElem.remove();
      // преобразует значение JS в строку JSON
      const strDataset = JSON.stringify(dataset);
      // добавляем набор данных в localStorage
      window.localStorage.setItem('keyDataset', strDataset);
    }
  }
}
