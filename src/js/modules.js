// функция проверяет длину строки
export const checkLengthOfTheString = (str) => {
  if (str.trim().length > 0) {
    return true;
  }
  return false;
};

// функция проверяет данные из localStorage на null (отсутствие значения)
export const checkLocalStorageForNull = () => {
  const dataFromLocalStorage = window.localStorage.getItem('keyDataset');

  if (dataFromLocalStorage === null) {
    return null;
  }
  return true;
};

// функция записывает данные в localStorage
export const writeToLocalStorage = (dataset, objEnteredData) => {
  dataset.unshift(objEnteredData);
  const strDataset = JSON.stringify(dataset);
  window.localStorage.setItem('keyDataset', strDataset);
};

// функция возвращает объект с данными из localStorage
export const returnAnObjectWithDataFromLocalStorage = () => {
  const dataFromLocalStorage = window.localStorage.getItem('keyDataset');
  const dataset = JSON.parse(dataFromLocalStorage);
  return dataset;
};

// функция для генерации id
export const generateId = () => Math.round(Math.random() * 100000000000000).toString(16);

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
export const createTaskListItems = (date, remove, tick, note, id) => {
  const ulElem = document.querySelector('.output-task__list');
  const liElem = document.createElement('li');

  liElem.classList.add('output-task__list-item');

  const divElem1 = document.createElement('div');
  const spanElem1 = document.createElement('span');
  const inputElem1 = document.createElement('input');
  const divElem2 = document.createElement('div');
  const spanElem2 = document.createElement('span');
  const spanElem3 = document.createElement('span');

  const dateElem1 = document.createTextNode(date);
  const crossElem2 = document.createTextNode(remove);

  divElem1.classList.add('output-task__list-item-block1');
  spanElem1.classList.add('output-task__list-item-block1-text');
  inputElem1.classList.add('output-task__list-item-block1-checkbox');
  divElem2.classList.add('output-task__list-item-block2');
  spanElem2.classList.add('output-task__list-item-block2-date');
  spanElem3.classList.add('output-task__list-item-block2-remove');

  inputElem1.setAttribute('type', 'checkbox');
  if (tick === true) {
    inputElem1.setAttribute('checked', tick);
    spanElem1.classList.add('completed');
  }

  divElem1.appendChild(spanElem1);
  divElem1.appendChild(inputElem1);
  divElem2.appendChild(spanElem2);
  divElem2.appendChild(spanElem3);
  spanElem2.appendChild(dateElem1);
  spanElem3.appendChild(crossElem2);

  spanElem1.textContent = note;

  liElem.setAttribute('data-id', id);
  liElem.appendChild(divElem1);
  liElem.appendChild(divElem2);

  ulElem.prepend(liElem);
};

// функция выводит (отображает) данные из локального хранилища в виде списка задач
export const displayLocalStorageData = () => {
  if (checkLocalStorageForNull() !== null) {
    const dataset = returnAnObjectWithDataFromLocalStorage();
    const liCollection = document.getElementsByClassName(
      'output-task__list-item',
    );

    if (dataset.length !== liCollection.length) {
      dataset.forEach((item, index) => {
        const newItem = { ...item };
        newItem.editing = false;
        dataset[index] = newItem;
        const strDataset = JSON.stringify(dataset);
        window.localStorage.setItem('keyDataset', strDataset);

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
};

// функция добавляет класс элементу
export const addClassToElement = (element, className) => {
  element.classList.add(className);
};

// функция удаляет класс у элемента
export const removeClassFromElement = (element, className) => {
  element.classList.remove(className);
};

// функция поиск элемента внутри созданной разметки
export const searchForElementInsideTheCreatedMarkup = (domElement) => {
  const progenitorElementClassName = 'output-task__list-item';
  const childElementBlock1ClassName = 'output-task__list-item-block1';
  const childElementBlock2ClassName = 'output-task__list-item-block2';
  const grandchildElementClassNameWithText = 'output-task__list-item-block1-text';
  const grandchildElementClassNameWithCheckbox = 'output-task__list-item-block1-checkbox';
  const grandchildElementClassNameWithDate = 'output-task__list-item-block2-date';
  const grandchildElementClassNameRemove = 'output-task__list-item-block2-remove';
  let foundElement = null;

  if (domElement.className === grandchildElementClassNameWithText) {
    foundElement = domElement;
  } else if (domElement.className === grandchildElementClassNameWithCheckbox) {
    foundElement = domElement;
  } else if (domElement.className === grandchildElementClassNameRemove) {
    foundElement = domElement;
  } else if (domElement.className === progenitorElementClassName) {
    const firstChildElem = domElement.firstElementChild;
    const firstGrandchildElem = firstChildElem.firstElementChild;
    foundElement = firstGrandchildElem;
  } else if (domElement.className === childElementBlock1ClassName) {
    const firstChildElem = domElement.firstElementChild;
    foundElement = firstChildElem;
  } else if (domElement.className === childElementBlock2ClassName) {
    const previousElem = domElement.previousElementSibling;
    const firstChildElem = previousElem.firstElementChild;
    foundElement = firstChildElem;
  } else if (domElement.className === grandchildElementClassNameWithDate) {
    const parentElem = domElement.parentElement;
    const previousElem = parentElem.previousElementSibling;
    const firstChildElem = previousElem.firstElementChild;
    foundElement = firstChildElem;
  }
  return foundElement;
};

// обновить видимость кнопки удаления элементов
export const updateTheVisibilityOfTheDeleteItemsButton = (indicator) => {
  const buttonDeletingItemsWithCheckboxes = document.querySelector('.entering-task__button-clearing');

  if (indicator > 0) {
    removeClassFromElement(buttonDeletingItemsWithCheckboxes, 'dn');
  } else if (indicator === 0) {
    addClassToElement(buttonDeletingItemsWithCheckboxes, 'dn');
  }
};
