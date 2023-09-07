
// Функция для генерации широты и долготы

const getGeolocation = (startNumber, endNumber, simbolsAfterComma) => {

  if ((startNumber < 0) || (endNumber < 0)) {
    return NaN;
  }

  let result = (Math.random() * (endNumber - startNumber) + startNumber).toFixed(simbolsAfterComma);
  if (endNumber <= startNumber) {
    result = (Math.random() * (startNumber - endNumber) + endNumber).toFixed(simbolsAfterComma);
  }

  return result;
};

// Функция для генерации случайного числа из диапазона

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция для получения случайного числа из диапазона длины массива

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Функция для создания массива с перечислением элементов списка случайной длины без повторения элементов

const getArray = (elements) => {

  const result = [];

  for (let element of elements) {
    element = getRandomArrayElement(elements);
    if (!result.includes(element)) {
      result.push(element);
    }
  }

  return result;
};

// Функция для генерации уникального идентификатора

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
      console.log(currentValue);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

export {getGeolocation, getRandomInteger, getRandomArrayElement, getArray, createRandomIdFromRangeGenerator};
