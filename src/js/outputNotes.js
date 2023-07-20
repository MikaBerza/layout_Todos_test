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
    // ___Считываем button для добавления задачи
    const buttonElem = document.querySelector('.enteringNotes__buttons-item');
    // переменная состояния, для манипулирования функцией редактирования
    let buttonNameState = false;

    // запишем возвращенный объект с данными из localStorage в константу
    const dataset = returnAnObjectWithDataFromLocalStorage();
    // получим (предка - элемент <li> из списка задач)
    // свойство parentNode содержит родительский элемент
    const liElem = taskTextElement.parentNode.parentNode;
    // получим id элемента <li>
    const idElem = liElem.getAttribute('data-id');

    // вызываем функцию чтобы добавить класс элементу
    // addClassToElement(liElem, 'outputNotes__list-item_edit');
    // вызываем функцию чтобы удалить класс у элемента
    // removeClassFromElement(liElem, 'outputNotes__list-item_edit');
    console.log(liElem);
  }
}

// функция изменяет значение checkbox и класса у элемента списка задач
export function changeCheckboxAndClassOfTaskListItem(checkboxElement) {
  // проверим строку с данными из localStorage на null (отсутствие значения)
  if (checkLocalStorageForNull() !== null) {
    // запишем возвращенный объект с данными из localStorage в константу
    const dataset = returnAnObjectWithDataFromLocalStorage();
    // получим (предка - элемент <li> из списка задач)
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
        // присваиваем новое значение
        if (newItem.tick === false) {
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
    // получим (предка - элемент <li> из списка задач)
    // свойство parentNode содержит родительский элемент
    const liElem = crossElement.parentNode.parentNode;
    // получим id элемента <li>
    const idElem = liElem.getAttribute('data-id');

    dataset.forEach((item, index) => {
      if (item.id === idElem) {
        // удаляем объект из массива(localStorage) по индексу
        dataset.splice(index, 1);
        // удаляем элемент из DOM
        liElem.remove();
      }
      // преобразует значение JS в строку JSON
      const strDataset = JSON.stringify(dataset);
      // добавляем набор данных в localStorage
      window.localStorage.setItem('keyDataset', strDataset);
    });
  }
}
