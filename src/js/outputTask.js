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

// функция для установки всех флажков
export function checkAllCheckboxes(dataset, nodeListCheckElem, nodeListTaskTextElem) {
  const newDataset = dataset;
  newDataset.forEach((item, index) => {
    // создаем новый объект на основе параметра
    const newItem = { ...item };
    // присвоим новое значение
    newItem.tick = true;
    // создаем новый объект на основе параметра
    const newNodeListCheckElem = nodeListCheckElem;
    // присвоим новое значение
    newNodeListCheckElem[index].checked = true;
    // вызываем функцию чтобы добавить класс элементу
    addClassToElement(nodeListTaskTextElem[index], 'completed');

    // заменяем элемент в массиве
    newDataset[index] = newItem;
    // преобразует значение JS в строку JSON
    const strDataset = JSON.stringify(newDataset);
    // добавляем набор данных в localStorage
    window.localStorage.setItem('keyDataset', strDataset);
  });
}

// функция для снятия всех флажков
export function takeOfAllCheckboxes(dataset, nodeListCheckElem, nodeListTaskTextElem) {
  const newDataset = dataset;
  newDataset.forEach((item, index) => {
    // создаем новый объект на основе параметра
    const newItem = { ...item };
    // присвоим новое значени
    newItem.tick = false;
    // создаем новый объект на основе параметра
    const newNodeListCheckElem = nodeListCheckElem;
    // присвоим новое значение
    newNodeListCheckElem[index].checked = false;
    // вызываем функцию чтобы удалить класс у элемента
    removeClassFromElement(nodeListTaskTextElem[index], 'completed');

    // заменяем элемент в массиве
    newDataset[index] = newItem;
    // преобразует значение JS в строку JSON
    const strDataset = JSON.stringify(newDataset);
    // добавляем набор данных в localStorage
    window.localStorage.setItem('keyDataset', strDataset);
  });
}

// функция для установки или снятия всех флажков
export function checkAndTakeOfAllCheckboxes(nodeListCheckElem, nodeListTaskTextElem) {
  // длина массива
  let arraylength = null;
  // счетчик checkbox с значением true
  let checkboxCounterTrue = null;

  // проверим строку с данными из localStorage на null (отсутствие значения)
  if (checkLocalStorageForNull() !== null) {
    // запишем возвращенный объект с данными из localStorage в константу
    const dataset = returnAnObjectWithDataFromLocalStorage();
    // получим длину массива
    arraylength = dataset.length;

    dataset.forEach((item) => {
      if (item.tick === true) {
        checkboxCounterTrue += 1;
      }
    });
    if (checkboxCounterTrue === arraylength) {
      // вызываем функцию установки всех флажков
      takeOfAllCheckboxes(dataset, nodeListCheckElem, nodeListTaskTextElem);
    } else {
      // вызываем функцию для снятия всех флажков
      checkAllCheckboxes(dataset, nodeListCheckElem, nodeListTaskTextElem);
    }
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
