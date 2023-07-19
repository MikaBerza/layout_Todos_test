import {
  checkLengthOfTheString,
  checkLocalStorageForNull,
  writeToLocalStorage,
  returnAnObjectWithDataFromLocalStorage,
  generateId,
  createTaskListItems,
} from './modules';

// функция добавляет задачу в список задач
export default function addTaskToTheList() {
  // Создадим объект с датой в формате (дд/мм/гг, чч.мм)
  const recordingDate = new Date(Date.now()).toLocaleDateString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
  // ___Считываем элемент <textarea>
  const textareaElem = document.querySelector('.enteringNotes__textarea-item');
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
