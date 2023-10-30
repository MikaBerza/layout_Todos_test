import {
  checkLocalStorageForNull,
  returnAnObjectWithDataFromLocalStorage,
  updateTheVisibilityOfTheDeleteItemsButton,
} from './modules';

// функция поиска элементов в списке задач
export const searchForItemsInTheList = (searchStringText) => {
  // проверим строку с данными из localStorage на null (отсутствие значения)
  if (checkLocalStorageForNull() !== null) {
    // запишем возвращенный объект с данными из localStorage в константу
    const dataset = returnAnObjectWithDataFromLocalStorage();
    dataset.forEach((item) => {
      // получим id элемента
      const idElem = item.id;
      // зная id элемента получим сам элемент
      const elem = document.querySelector(`[data-id="${idElem}"]`);
      // Если совпадение в строке найдено, показываем элемент
      if (item.note.toUpperCase().indexOf(searchStringText) > -1) {
        elem.style.display = '';
        // Если совпадение в строке НЕ найдено, НЕ показываем элемент
      } else {
        elem.style.display = 'none';
      }
    });
  }
};

// функция вычисляет количество активных и завершенных задач
export const calcActiveAndCompletedTasks = () => {
  // ___Считываем элемент <span> со значением все
  const tasksAll = document.querySelector('.counters__tasks-all');
  // ___Считываем элемент <span> со значением активен
  const tasksActive = document.querySelector('.counters__tasks-active');
  // ___Считываем элемент <span> со значением завершено
  const tasksCompleted = document.querySelector('.counters__tasks-completed');
  // ___Считываем элемент <meter> для отображения индикатора выполненных задач
  const indicator = document.querySelector('.counters__indicator');

  // создадим константы с процентами для индикатора выполненных задач
  const thirtyPercent = 0.3;
  const sixtyPercent = 0.6;
  const ninetyPercent = 0.9;

  // проверим строку с данными из localStorage на null (отсутствие значения)
  if (checkLocalStorageForNull() !== null) {
    // запишем возвращенный объект с данными из localStorage в константу
    const dataset = returnAnObjectWithDataFromLocalStorage();
    // переменные (счетчики активных и завершенных задач)
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

    // Индикация выполненных задач
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
  // вызываем функцию для обновления видимости кнопки удаления элементов
  updateTheVisibilityOfTheDeleteItemsButton(indicator.value);
};

// ___функция для получения отфильтрованных элементов в списке задач
export const getFilteredItems = (textOfTheSelectedItem) => {
  // проверим строку с данными из localStorage на null (отсутствие значения)
  if (checkLocalStorageForNull() !== null) {
    // запишем возвращенный объект с данными из localStorage в константу
    const dataset = returnAnObjectWithDataFromLocalStorage();
    if (textOfTheSelectedItem === 'все') {
      dataset.forEach((item) => {
        // получим id элемента
        const idElem = item.id;
        // зная id элемента получим сам элемент
        const elem = document.querySelector(`[data-id="${idElem}"]`);
        // покажем все задачи
        elem.style.display = '';
      });
    } else if (textOfTheSelectedItem === 'активные') {
      dataset.forEach((item) => {
        // получим id элемента
        const idElem = item.id;
        // зная id элемента получим сам элемент
        const elem = document.querySelector(`[data-id="${idElem}"]`);
        if (item.tick === true) {
          // покажем только активные задачи, остальные скроем
          elem.style.display = 'none';
        } else if (item.tick === false) {
          elem.style.display = '';
        }
      });
    } else if (textOfTheSelectedItem === 'завершенные') {
      dataset.forEach((item) => {
        // получим id элемента
        const idElem = item.id;
        // зная id элемента получим сам элемент
        const elem = document.querySelector(`[data-id="${idElem}"]`);
        if (item.tick === false) {
          // покажем только завершенные задачи, остальные скроем
          elem.style.display = 'none';
        } else if (item.tick === true) {
          elem.style.display = '';
        }
      });
    }
  }
};
