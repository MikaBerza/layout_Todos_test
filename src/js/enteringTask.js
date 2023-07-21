import {
  checkLengthOfTheString,
  checkLocalStorageForNull,
  writeToLocalStorage,
  returnAnObjectWithDataFromLocalStorage,
  generateId,
  createTaskListItems,
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
  const buttonElem = document.querySelector('.enteringTask__buttons-item');
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
