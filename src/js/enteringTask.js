import {
  checkLengthOfTheString,
  checkLocalStorageForNull,
  writeToLocalStorage,
  returnAnObjectWithDataFromLocalStorage,
  generateId,
  createTaskListItems,
  addClassToElement,
  removeClassFromElement,
} from './modules';

// функция добавляет задачу в список задач
export function addTaskToTheList() {
  // Создадим объект с датой в формате (дд/мм/гг, чч.мм)
  const recordingDate = new Date(Date.now()).toLocaleDateString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
  // ___Считываем элемент <textarea>
  const textareaElem = document.querySelector('.enteringTask__textarea-item');
  // получим текст введенный в <textarea>
  const textEntry = textareaElem.value.trim();

  // если длина строки больше 0 и localStorage равен null
  if (
    checkLengthOfTheString(textEntry) === true
    && checkLocalStorageForNull() === null
  ) {
    // формируем объект с введенными данными
    const objEnteredData = {
      note: textEntry,
      tick: false,
      date: recordingDate,
      remove: 'x',
      id: generateId(),
      editing: false,
    };
    // создадим набор данных
    const dataset = [];
    // вызываем функцию для записи данных в localStorage
    writeToLocalStorage(dataset, objEnteredData);
    // вызываем функцию для создания элементов списка задач
    createTaskListItems(
      objEnteredData.date,
      objEnteredData.remove,
      objEnteredData.tick,
      objEnteredData.note,
      objEnteredData.id,
    );
    // После добавление записи, очищаем поле для ввода
    textareaElem.value = '';

    // если длина строки больше 0 и localStorage НЕравен null
  } else if (
    checkLengthOfTheString(textEntry) === true
    && checkLocalStorageForNull() !== null
  ) {
    // формируем объект с введенными данными
    const objEnteredData = {
      note: textEntry,
      tick: false,
      date: recordingDate,
      remove: 'x',
      id: generateId(),
      editing: false,
    };
    // запишем возвращенный объект с данными из localStorage в константу
    const dataset = returnAnObjectWithDataFromLocalStorage();
    // вызываем функцию для записи данных в localStorage
    writeToLocalStorage(dataset, objEnteredData);
    // вызываем функцию для создания элементов списка задач
    createTaskListItems(
      objEnteredData.date,
      objEnteredData.remove,
      objEnteredData.tick,
      objEnteredData.note,
      objEnteredData.id,
    );
    // После добавление записи, очищаем поле для ввода
    textareaElem.value = '';
  }
}

// функция заменить задачу в список задач при редактировании
export function replaceTaskToTheListWhenEditing() {
  // ___Считываем <button> для добавления задачи
  const buttonElem = document.querySelector('.enteringTask__buttons-itemAdding');
  // ___Считываем элемент <textarea>
  const textareaElem = document.querySelector('.enteringTask__textarea-item');

  // запишем возвращенный объект с данными из localStorage в константу
  const dataset = returnAnObjectWithDataFromLocalStorage();
  // получим текст введенный в <textarea>
  const textEntry = textareaElem.value.trim();

  // если длина строки больше 0
  if (checkLengthOfTheString(textEntry) === true) {
    dataset.forEach((item, index) => {
      if (item.editing === true) {
        // изменяем название кнопки
        buttonElem.textContent = 'Добавить';

        // создаем объект с датой в формате (дд/мм/гг, чч.мм)
        const recordingDate = new Date(Date.now()).toLocaleDateString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        });

        // создаем новый объект на основе параметра
        const newItem = { ...item };
        // присваиваем новое значение
        newItem.note = textEntry;
        newItem.tick = false;
        newItem.date = recordingDate;
        newItem.editing = false;
        // заменяем элемент в массиве
        dataset[index] = newItem;
        // преобразует значение JS в строку JSON
        const strDataset = JSON.stringify(dataset);
        // добавляем набор данных в localStorage
        window.localStorage.setItem('keyDataset', strDataset);

        // получим id элемента <li>
        const idElem = item.id;
        // получим элемент <li> зная id элемента
        const liElem = document.querySelector(`[data-id="${idElem}"]`);
        // получим родителя элемент <ul>
        const ulElem = liElem.parentElement;
        // получим внука элемента <li>, элемент <span> который хранит текст задачи
        const taskTextElement = liElem.firstElementChild.firstElementChild;
        // зададим новое текстовое содержимое элементу <span> который хранит текст задачи
        taskTextElement.textContent = textEntry;
        // получим внука элемента <li>, элемент <span> который хранит дату записи задачи
        const dateElement = liElem.lastElementChild.firstElementChild;
        // зададим новое текстовое содержимое элементу <span> который хранит дату записи задачи
        dateElement.textContent = recordingDate;

        // вызываем функцию чтобы удалить класс у элемента
        removeClassFromElement(ulElem, 'dn');
        // После редактирования записи, очищаем поле для ввода
        textareaElem.value = '';
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

// функция для удаления элементов с отмеченными флажками
export function deletingItemsWithCheckboxes() {
  // проверим строку с данными из localStorage на null (отсутствие значения)
  if (checkLocalStorageForNull() !== null) {
    // запишем возвращенный объект с данными из localStorage в константу
    const dataset = returnAnObjectWithDataFromLocalStorage();
    // получим NodeList элементов <li>
    const nodeListElemLi = document.querySelectorAll('.outputTask__list-item');

    /* Будем пробегаться по массиву (dataset) в обратном порядке,
       чтобы избежать влияет изменение индексов при удалении элементов
       методом (splice) */

    for (let i = dataset.length - 1; i >= 0; i -= 1) {
      if (dataset[i].tick === true) {
        // удаляем объект из массива(localStorage) по индексу
        /* В данном случае, при удалении элемента с индексом `i`
        с помощью метода (splice), все элементы массива с более высокими индексами
        сдвигаются на одну позицию влево, и при следующей итерации цикла `for`,
        переменная `i` снова увеличивается на 1, что позволяет корректно обойти
        все элементы массива (dataset) */
        dataset.splice(i, 1);
        // удаляем элемент из DOM
        nodeListElemLi[i].remove();
      }
      // преобразует значение JS в строку JSON
      const strDataset = JSON.stringify(dataset);
      // добавляем набор данных в localStorage
      window.localStorage.setItem('keyDataset', strDataset);
    }
  }
}
