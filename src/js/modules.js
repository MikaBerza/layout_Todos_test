// ___Считываем маркированный список <ul>
export const ulElem = document.querySelector('.outputNotes__list');

// функция добавляет новый элемент <li> в список <ul>
export function addNewItemToTheList(date, close, status, note) {
  // Метод createElement создает новый элемент,передав в параметре имя тега
  // создаем элемент <li>
  const liElem = document.createElement('li');
  // для элемента <li> назначаем класс "outputNotes__list-item",
  // метод add объекта classList добавляет CSS класс элементу
  liElem.classList.add('outputNotes__list-item');
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
  const crossElem2 = document.createTextNode(close);

  // для элементов назначаем классы
  divElem1.classList.add('outputNotes__list-item-block1');
  spanElem1.classList.add('outputNotes__list-item-block1-text');
  inputElem1.classList.add('outputNotes__list-item-block1-checkbox');
  //
  divElem2.classList.add('outputNotes__list-item-block2');
  spanElem2.classList.add('outputNotes__list-item-block2-date');
  spanElem3.classList.add('outputNotes__list-item-block2-close');

  // добавляем атрибут для тега <input>
  inputElem1.setAttribute('type', 'checkbox');
  if (status === true) {
    // добавляем атрибут для тега <input> установленный флажок
    inputElem1.setAttribute('checked', status);
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

  // Во внутрь тега <li> вставляем тег <span>
  liElem.appendChild(divElem1);
  liElem.appendChild(divElem2);
  // Во внутрь тега <ul> вставляем тег <li>
  ulElem.appendChild(liElem);
}

// когда страница загружена выведем список записей из localStorage на страницу
document.addEventListener('DOMContentLoaded', () => {
  // получим строку с данными из localStorage
  const dataFromLocalStorage = window.localStorage.getItem('keyDataset');
  // проверим строку с данными из localStorage на отсутствие значения
  if (dataFromLocalStorage !== null) {
    // преобразуем строку JSON из localStorage в значение JS
    const dataset = JSON.parse(dataFromLocalStorage);
    // получим HTMLCollection элементов <li> списка <ul>
    const liCollection = document.getElementsByClassName(
      'outputNotes__list-item',
    );
    /* проверим уже выведенный список записей на страницы с записями
       из localStorage, данная проверка нужна, чтобы избежать повторного
       вывода записей при перезагрузки страницы */
    if (dataset.length !== liCollection.length) {
      dataset.forEach((item) => {
        addNewItemToTheList(item.date, item.close, item.status, item.note);
      });
    }
  }
});
