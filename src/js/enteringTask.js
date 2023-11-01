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
export const addTaskToTheList = () => {
  const recordingDate = new Date(Date.now()).toLocaleDateString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });

  const textareaElem = document.querySelector('.entering-task__textarea-item');
  const textEntry = textareaElem.value.trim();

  if (
    checkLengthOfTheString(textEntry) === true
    && checkLocalStorageForNull() === null
  ) {
    const objEnteredData = {
      note: textEntry,
      tick: false,
      date: recordingDate,
      remove: 'x',
      id: generateId(),
      editing: false,
    };
    const dataset = [];

    writeToLocalStorage(dataset, objEnteredData);
    createTaskListItems(
      objEnteredData.date,
      objEnteredData.remove,
      objEnteredData.tick,
      objEnteredData.note,
      objEnteredData.id,
    );
    textareaElem.value = '';
  } else if (
    checkLengthOfTheString(textEntry) === true
    && checkLocalStorageForNull() !== null
  ) {
    const objEnteredData = {
      note: textEntry,
      tick: false,
      date: recordingDate,
      remove: 'x',
      id: generateId(),
      editing: false,
    };
    const dataset = returnAnObjectWithDataFromLocalStorage();

    writeToLocalStorage(dataset, objEnteredData);
    createTaskListItems(
      objEnteredData.date,
      objEnteredData.remove,
      objEnteredData.tick,
      objEnteredData.note,
      objEnteredData.id,
    );
    textareaElem.value = '';
  }
};

// функция вернуть старую задачу
export const returnAnOldTask = () => {
  const buttonElem = document.querySelector('.entering-task__button-adding');
  const buttonSetCheckboxes = document.querySelector('.entering-task__button-mark');
  const buttonDeletingItemsWithCheckboxes = document.querySelector('.entering-task__button-clearing');
  const textareaElem = document.querySelector('.entering-task__textarea-item');
  const dataset = returnAnObjectWithDataFromLocalStorage();

  dataset.forEach((item, index) => {
    if (item.editing === true) {
      buttonElem.textContent = 'Добавить';
      const newItem = { ...item };
      newItem.editing = false;
      dataset[index] = newItem;
      window.localStorage.setItem('keyDataset', JSON.stringify(dataset));

      const idElem = item.id;
      const liElem = document.querySelector(`[data-id="${idElem}"]`);
      const ulElem = liElem.parentElement;

      removeClassFromElement(ulElem, 'dn');
      removeClassFromElement(buttonSetCheckboxes, 'dn');
      removeClassFromElement(buttonDeletingItemsWithCheckboxes, 'dn');
      removeClassFromElement(buttonElem, 'edit-w2');

      textareaElem.value = '';
    }
  });
};

// функция заменить задачу в списке задач при редактировании
export const replaceTaskToTheListWhenEditing = () => {
  const buttonElem = document.querySelector('.entering-task__button-adding');
  const buttonSetCheckboxes = document.querySelector('.entering-task__button-mark');
  const buttonDeletingItemsWithCheckboxes = document.querySelector('.entering-task__button-clearing');
  const textareaElem = document.querySelector('.entering-task__textarea-item');
  const dataset = returnAnObjectWithDataFromLocalStorage();
  const textEntry = textareaElem.value.trim();

  if (checkLengthOfTheString(textEntry) === true) {
    dataset.forEach((item, index) => {
      if (item.editing === true) {
        buttonElem.textContent = 'Добавить';

        const recordingDate = new Date(Date.now()).toLocaleDateString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        });
        const newItem = { ...item };

        newItem.note = textEntry;
        newItem.tick = false;
        newItem.date = recordingDate;
        newItem.editing = false;

        dataset[index] = newItem;
        window.localStorage.setItem('keyDataset', JSON.stringify(dataset));

        const idElem = item.id;
        const liElem = document.querySelector(`[data-id="${idElem}"]`);
        const ulElem = liElem.parentElement;
        const taskTextElement = liElem.firstElementChild.firstElementChild;
        taskTextElement.textContent = textEntry;
        const dateElement = liElem.lastElementChild.firstElementChild;
        dateElement.textContent = recordingDate;

        removeClassFromElement(ulElem, 'dn');
        removeClassFromElement(buttonSetCheckboxes, 'dn');
        removeClassFromElement(buttonDeletingItemsWithCheckboxes, 'dn');
        removeClassFromElement(buttonElem, 'edit-w2');

        textareaElem.value = '';
      }
    });
  }
};

// функция для установки всех флажков
export const checkAllCheckboxes = (dataset, nodeListCheckElem, nodeListTaskTextElem) => {
  const newDataset = dataset;

  newDataset.forEach((item, index) => {
    const newItem = { ...item };
    newItem.tick = true;
    const newNodeListCheckElem = nodeListCheckElem;
    newNodeListCheckElem[index].checked = true;
    addClassToElement(nodeListTaskTextElem[index], 'completed');

    newDataset[index] = newItem;
    window.localStorage.setItem('keyDataset', JSON.stringify(newDataset));
  });
};

// функция для снятия всех флажков
export const takeOfAllCheckboxes = (dataset, nodeListCheckElem, nodeListTaskTextElem) => {
  const newDataset = dataset;

  newDataset.forEach((item, index) => {
    const newItem = { ...item };
    newItem.tick = false;
    const newNodeListCheckElem = nodeListCheckElem;
    newNodeListCheckElem[index].checked = false;
    removeClassFromElement(nodeListTaskTextElem[index], 'completed');

    newDataset[index] = newItem;
    window.localStorage.setItem('keyDataset', JSON.stringify(newDataset));
  });
};

// функция для установки или снятия всех флажков
export const checkAndTakeOfAllCheckboxes = (nodeListCheckElem, nodeListTaskTextElem) => {
  let arraylength = null;
  let checkboxCounterTrue = null;

  if (checkLocalStorageForNull() !== null) {
    const dataset = returnAnObjectWithDataFromLocalStorage();
    arraylength = dataset.length;

    dataset.forEach(({ tick }) => {
      if (tick === true) {
        checkboxCounterTrue += 1;
      }
    });

    if (checkboxCounterTrue === arraylength) {
      takeOfAllCheckboxes(dataset, nodeListCheckElem, nodeListTaskTextElem);
    } else {
      checkAllCheckboxes(dataset, nodeListCheckElem, nodeListTaskTextElem);
    }
  }
};

// функция для удаления элементов с отмеченными флажками
export const deletingItemsWithCheckboxes = () => {
  if (checkLocalStorageForNull() !== null) {
    const dataset = returnAnObjectWithDataFromLocalStorage();
    const nodeListElemLi = document.querySelectorAll('.output-task__list-item');

    for (let i = dataset.length - 1; i >= 0; i -= 1) {
      if (dataset[i].tick === true) {
        dataset.splice(i, 1);
        nodeListElemLi[i].remove();
      }

      window.localStorage.setItem('keyDataset', JSON.stringify(dataset));
    }
  }
};
