import {
  addNewItemToTheList,
} from './modules';
// ___Считываем textareaElem для записи/редактирования
const textareaElem = document.querySelector('.enteringNotes__textarea-item');
// ___Считываем buttonElem для добавления записи
const buttonElem = document.querySelector('.enteringNotes__buttons-item');

// Объект с датой в формате (дд/мм/гг, чч.мм)
const recordingDate = new Date(Date.now()).toLocaleDateString('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  day: '2-digit',
  month: '2-digit',
  year: '2-digit',
});

// функция проверяет длину строки
function checkLengthOfTheString(str) {
  if (str.length > 0) {
    return true;
  }
  return false;
}

// функция записывает данные в localStorage
function writeToLocalStorage(dataset, objEnteredData) {
  // добавим объект с введенными данными в набор данных
  dataset.push(objEnteredData);
  // преобразует значение JS в строку JSON
  const strDataset = JSON.stringify(dataset);
  // добавляем набор данных в localStorage
  window.localStorage.setItem('keyDataset', strDataset);
}

// функция добавляет задачу в список
function addTaskToTheList() {
  // текст введенный в textarea
  const textEntry = textareaElem.value.trim();
  // получим строку с данными из localStorage
  const dataFromLocalStorage = window.localStorage.getItem('keyDataset');

  if (
    checkLengthOfTheString(textEntry) !== false
    && dataFromLocalStorage === null
  ) {
    // формируем объект с введенными данными
    const objEnteredData = {
      note: textEntry,
      status: false,
      date: recordingDate,
      close: 'x',
    };
    // создадим набор данных
    const dataset = [];
    // вызываем функцию для записи данных в localStorage
    writeToLocalStorage(dataset, objEnteredData);
    // вызываем функцию для добавления нового элемента <li> в список <ul>
    addNewItemToTheList(
      objEnteredData.date,
      objEnteredData.close,
      objEnteredData.status,
      objEnteredData.note,
    );
  } else if (
    checkLengthOfTheString(textEntry) !== false
    && dataFromLocalStorage !== null
  ) {
    // формируем объект с введенными данными
    const objEnteredData = {
      note: textEntry,
      status: false,
      date: recordingDate,
      close: 'x',
    };
    // преобразуем строку JSON из localStorage в значение JS
    const dataset = JSON.parse(dataFromLocalStorage);
    // вызываем функцию для записи данных в localStorage
    writeToLocalStorage(dataset, objEnteredData);
    // вызываем функцию для добавления нового элемента <li> в список <ul>
    addNewItemToTheList(
      objEnteredData.date,
      objEnteredData.close,
      objEnteredData.status,
      objEnteredData.note,
    );
  }
}

buttonElem.addEventListener('click', () => {
  addTaskToTheList();
  // После добавление записи, очищаем поле для ввода
  textareaElem.value = '';
});
