// функция проверяет длину строки
export function checkLengthOfTheString(str) {
  if (str.length > 0) {
    return true;
  }
  return false;
}

// функция проверяет данные из localStorage на null (отсутствие значения)
export function checkLocalStorageForNull() {
  // получим строку с данными из localStorage
  const dataFromLocalStorage = window.localStorage.getItem('keyDataset');
  if (dataFromLocalStorage === null) {
    return null;
  }
  return true;
}

// функция записывает данные в localStorage
export function writeToLocalStorage(dataset, objEnteredData) {
  // добавим объект с введенными данными в набор данных
  dataset.unshift(objEnteredData);
  // преобразует значение JS в строку JSON
  const strDataset = JSON.stringify(dataset);
  // добавляем набор данных в localStorage
  window.localStorage.setItem('keyDataset', strDataset);
}

// функция возвращает объект с данными из localStorage
export function returnAnObjectWithDataFromLocalStorage() {
  // получим строку с данными из localStorage
  const dataFromLocalStorage = window.localStorage.getItem('keyDataset');
  // преобразуем строку JSON из localStorage в значение JS
  const dataset = JSON.parse(dataFromLocalStorage);
  return dataset;
}

// функция для генерации id
export function generateId() {
  // 1.сгенерируем случайное число от 0 до 1
  // 2.генерируемое число умножим на (100000000000000)
  // 3.округлим полученное число по обычным правилам матем.
  // 4.toString(16)--- в скобках укажем шестнадцатеричную систему счисления
  // 5.число преобразуем в строку, представляющую число в шестнадцатеричной системе
  return Math.round(Math.random() * 100000000000000).toString(16);
}

/* Создадим такую разметку*
 <li class="output-task__list-item">
  <div class="output-task__list-item-block1">
    <span class="output-task__list-item-block1-text">текст</span>
    <input class="output-task__list-item-block1-checkbox" type="checkbox" checked="off">
  </div>
  <div class="output-task__list-item-block2">
    <span class="output-task__list-item-block2-date">22/12/22, 13:32</span>
    <span class="output-task__list-item-block2-remove">x</span>
  </div>
</li>
*/

// функция создает элементы списка задач*
export function createTaskListItems(date, remove, tick, note, id) {
  // ___Считываем маркированный список <ul>
  const ulElem = document.querySelector('.output-task__list');

  // Метод createElement создает новый элемент,передав в параметре имя тега
  // создаем элемент <li>
  const liElem = document.createElement('li');
  // для элемента <li> назначаем класс "output-task__list-item",
  // метод add объекта classList добавляет CSS класс элементу
  liElem.classList.add('output-task__list-item');
  // создаем элементы для блока 1
  const divElem1 = document.createElement('div');
  const spanElem1 = document.createElement('span');
  const inputElem1 = document.createElement('input');
  // создаем элементы для блока 2
  const divElem2 = document.createElement('div');
  const spanElem2 = document.createElement('span');
  const spanElem3 = document.createElement('span');

  // Создаёт новый текстовый узел с заданным текстом:
  const dateElem1 = document.createTextNode(date);
  const crossElem2 = document.createTextNode(remove);

  // для элементов назначаем классы
  divElem1.classList.add('output-task__list-item-block1');
  spanElem1.classList.add('output-task__list-item-block1-text');
  inputElem1.classList.add('output-task__list-item-block1-checkbox');
  //
  divElem2.classList.add('output-task__list-item-block2');
  spanElem2.classList.add('output-task__list-item-block2-date');
  spanElem3.classList.add('output-task__list-item-block2-remove');

  // добавляем атрибут для тега <input>
  inputElem1.setAttribute('type', 'checkbox');
  // запишем условие
  if (tick === true) {
    // добавляем атрибут для тега <input> установленный флажок
    inputElem1.setAttribute('checked', tick);
    // добавим класс элементу spanElem1 что задача выполнена
    spanElem1.classList.add('completed');
  }

  // Во внутрь тега <div> вставляем заданный текст
  // Метод appendChild позволяет вставить в конец какого-либо другой элемент
  divElem1.appendChild(spanElem1);
  divElem1.appendChild(inputElem1);

  divElem2.appendChild(spanElem2);
  divElem2.appendChild(spanElem3);

  // Во внутрь тега <span> вставляем заданный текст
  spanElem2.appendChild(dateElem1);
  spanElem3.appendChild(crossElem2);

  // Эта запись будет добавляться
  spanElem1.textContent = note;

  // добавляем атрибут data-id для тега <li>
  liElem.setAttribute('data-id', id);

  // Во внутрь тега <li> вставляем тег <span>
  liElem.appendChild(divElem1);
  liElem.appendChild(divElem2);
  // Во внутрь тега <ul> вставляем тег <li>
  ulElem.prepend(liElem);
}

// функция выводит (отображает) данные из локального хранилища в виде списка задач
export function displayLocalStorageData() {
  // проверим строку с данными из localStorage на null (отсутствие значения)
  if (checkLocalStorageForNull() !== null) {
    // запишем возвращенный объект с данными из localStorage в константу
    const dataset = returnAnObjectWithDataFromLocalStorage();
    // получим HTMLCollection элементов <li> списка <ul>
    const liCollection = document.getElementsByClassName(
      'output-task__list-item',
    );
    /* Если во время редактирования страницы, перезагрузить страницу,
       то поле (editing:true) так и останется в таком состоянии и в дальнейшем
       эту запись уже нельзя будет перевести в другое состояние.
       Для исправления этой ошибки, изменим все поля на (editing:false) */

    /* проверим уже выведенный список задач на страницы с записями
       из localStorage, данная проверка нужна, чтобы избежать повторного
       вывода задач при перезагрузки страницы */
    if (dataset.length !== liCollection.length) {
      dataset.forEach((item, index) => {
        // создаем новый объект на основе параметра
        const newItem = { ...item };
        // присваиваем новое значение
        newItem.editing = false;
        // заменяем элемент в массиве
        dataset[index] = newItem;
        // преобразует значение JS в строку JSON
        const strDataset = JSON.stringify(dataset);
        // добавляем набор данных в localStorage
        window.localStorage.setItem('keyDataset', strDataset);

        // вызываем функцию для создания элементов списка задач
        createTaskListItems(
          item.date,
          item.remove,
          item.tick,
          item.note,
          item.id,
        );
      });
    }
  }
}

// функция добавляет класс элементу
export function addClassToElement(element, className) {
  element.classList.add(className);
}

// функция удаляет класс у элемента
export function removeClassFromElement(element, className) {
  element.classList.remove(className);
}

// обновить видимость кнопки удаления элементов
export function updateTheVisibilityOfTheDeleteItemsButton(indicator) {
  // ___Считываем button для удаления элементов с отмеченными флажками
  const buttonDeletingItemsWithCheckboxes = document.querySelector('.entering-task__button-clearing');
  if (indicator > 0) {
    // вызываем функцию чтобы удалить класс у элемента
    removeClassFromElement(buttonDeletingItemsWithCheckboxes, 'dn');
  } else if (indicator === 0) {
    // вызываем функцию чтобы добавить класс элементу
    addClassToElement(buttonDeletingItemsWithCheckboxes, 'dn');
  }
}
