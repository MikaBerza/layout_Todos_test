import {
  checkLocalStorageForNull,
  returnAnObjectWithDataFromLocalStorage,
  addClassToElement,
  removeClassFromElement,
} from './modules';

// функция для редактирования текста задачи
export const editTheTaskText = (taskTextElement) => {
  if (checkLocalStorageForNull() !== null) {
    const buttonElem = document.querySelector('.entering-task__button-adding');
    const buttonSetCheckboxes = document.querySelector('.entering-task__button-mark');
    const buttonDeletingItemsWithCheckboxes = document.querySelector('.entering-task__button-clearing');
    const textareaElem = document.querySelector('.entering-task__textarea-item');
    const dataset = returnAnObjectWithDataFromLocalStorage();
    const liElem = taskTextElement.parentNode.parentNode;
    const ulElem = liElem.parentElement;
    const idElem = liElem.getAttribute('data-id');

    dataset.forEach((item, index) => {
      if (item.id === idElem && item.tick !== true) {
        const newItem = { ...item };
        if (newItem.editing === false) {
          newItem.editing = true;
          textareaElem.value = newItem.note;

          addClassToElement(ulElem, 'dn');
          addClassToElement(buttonSetCheckboxes, 'dn');
          addClassToElement(buttonDeletingItemsWithCheckboxes, 'dn');

          buttonElem.textContent = 'Редактировать';
          addClassToElement(buttonElem, 'edit-w2');
        }
        dataset[index] = newItem;
        window.localStorage.setItem('keyDataset', JSON.stringify(dataset));
      }
    });
  }
};

// функция изменяет значение checkbox и класса у элемента списка задач
export const changeCheckboxAndClassOfTaskListItem = (checkboxElement) => {
  if (checkLocalStorageForNull() !== null) {
    const dataset = returnAnObjectWithDataFromLocalStorage();
    const liElem = checkboxElement.parentNode.parentNode;
    const taskTextElem = checkboxElement.previousElementSibling;
    const idElem = liElem.getAttribute('data-id');

    dataset.forEach((item, index) => {
      if (item.id === idElem) {
        const newItem = { ...item };
        if (newItem.tick === false) {
          newItem.tick = true;
          addClassToElement(taskTextElem, 'completed');
        } else if (newItem.tick === true) {
          newItem.tick = false;
          removeClassFromElement(taskTextElem, 'completed');
        }
        dataset[index] = newItem;
        window.localStorage.setItem('keyDataset', JSON.stringify(dataset));
      }
    });
  }
};

// функция для удаления элемента из списка задач
export const removeFromTheTaskList = (crossElement) => {
  if (checkLocalStorageForNull() !== null) {
    const dataset = returnAnObjectWithDataFromLocalStorage();
    const liElem = crossElement.parentNode.parentNode;
    const idElem = liElem.getAttribute('data-id');
    const elementIndex = dataset.findIndex(({ id }) => id === idElem);

    if (elementIndex !== -1) {
      dataset.splice(elementIndex, 1);
      liElem.remove();
      window.localStorage.setItem('keyDataset', JSON.stringify(dataset));
    }
  }
};
