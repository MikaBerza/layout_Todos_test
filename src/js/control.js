import {
  checkLocalStorageForNull,
  returnAnObjectWithDataFromLocalStorage,
  updateTheVisibilityOfTheDeleteItemsButton,
} from './modules';

// функция поиска элементов в списке задач
export const searchForItemsInTheList = (searchStringText) => {
  if (checkLocalStorageForNull() !== null) {
    const dataset = returnAnObjectWithDataFromLocalStorage();

    dataset.forEach((item) => {
      const idElem = item.id;
      const elem = document.querySelector(`[data-id="${idElem}"]`);

      if (item.note.toUpperCase().indexOf(searchStringText) > -1) {
        elem.style.display = '';
      } else {
        elem.style.display = 'none';
      }
    });
  }
};

// функция вычисляет количество активных и завершенных задач
export const calcActiveAndCompletedTasks = () => {
  const tasksAll = document.querySelector('.counters__tasks-all');
  const tasksActive = document.querySelector('.counters__tasks-active');
  const tasksCompleted = document.querySelector('.counters__tasks-completed');
  const indicator = document.querySelector('.counters__indicator');
  const thirtyPercent = 0.3;
  const sixtyPercent = 0.6;
  const ninetyPercent = 0.9;

  if (checkLocalStorageForNull() !== null) {
    const dataset = returnAnObjectWithDataFromLocalStorage();
    let allTaskCounter = 0;
    let activeTaskCounter = 0;
    let completedTaskCounter = 0;

    dataset.forEach((item) => {
      if (item.tick === true) {
        completedTaskCounter += 1;
      } else if (item.tick === false) {
        activeTaskCounter += 1;
      }
      allTaskCounter = completedTaskCounter + activeTaskCounter;
    });
    tasksAll.textContent = `всего-${allTaskCounter}`;
    tasksActive.textContent = `активно-${activeTaskCounter}`;
    tasksCompleted.textContent = `завершено-${completedTaskCounter}`;

    indicator.value = completedTaskCounter;
    indicator.low = (allTaskCounter * thirtyPercent).toFixed(2);
    indicator.high = (allTaskCounter * sixtyPercent).toFixed(2);
    indicator.max = allTaskCounter;
    indicator.optimum = (allTaskCounter * ninetyPercent).toFixed(2);
  } else {
    tasksAll.textContent = 'всего-0';
    tasksActive.textContent = 'активно-0';
    tasksCompleted.textContent = 'завершено-0';
  }
  updateTheVisibilityOfTheDeleteItemsButton(indicator.value);
};

// ___функция для получения отфильтрованных элементов в списке задач
export const getFilteredItems = (textOfTheSelectedItem) => {
  if (checkLocalStorageForNull() !== null) {
    const dataset = returnAnObjectWithDataFromLocalStorage();

    if (textOfTheSelectedItem === 'все') {
      dataset.forEach((item) => {
        const idElem = item.id;
        const elem = document.querySelector(`[data-id="${idElem}"]`);
        elem.style.display = '';
      });
    } else if (textOfTheSelectedItem === 'активные') {
      dataset.forEach((item) => {
        const idElem = item.id;
        const elem = document.querySelector(`[data-id="${idElem}"]`);
        if (item.tick === true) {
          elem.style.display = 'none';
        } else if (item.tick === false) {
          elem.style.display = '';
        }
      });
    } else if (textOfTheSelectedItem === 'завершенные') {
      dataset.forEach((item) => {
        const idElem = item.id;
        const elem = document.querySelector(`[data-id="${idElem}"]`);
        if (item.tick === false) {
          elem.style.display = 'none';
        } else if (item.tick === true) {
          elem.style.display = '';
        }
      });
    }
  }
};
