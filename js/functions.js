// Функция для проверки, является ли строка палиндромом

const isPallindrom = (string) => {
  let reverseString = '';
  string = string.toLowerCase().replaceAll(' ', '');
  for (let i = string.length - 1; i >= 0; i--) {
    reverseString += string[i];
  }
  const result = (string === reverseString);
  return result;
};

isPallindrom('Топот');
isPallindrom('ДовОд');
isPallindrom('Кекс');
isPallindrom('Лёша на полке клопа нашёл');

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN

const isNumber = (string) => {
  let newString;
  let onlyNumbers = '';
  if (!isNaN(string)) {
    onlyNumbers += Math.floor(Math.abs(string));

    // Добавляем десятичную часть числа без округления
    const decimalPart = Math.abs(string) % 1;
    if (decimalPart > 0) {
      // Удаляем точку из десятичной части
      onlyNumbers += decimalPart.toString().replaceAll('.', '');
    }

  } else {
    newString = string.toLowerCase().replaceAll(' ', '');
    for (let i = 0; i < newString.length; i++) {
      if (!isNaN(newString[i])) {
        onlyNumbers += newString[i];
      }
    }
  }

  const result = Math.round(parseFloat(onlyNumbers));
  return result;
};

isNumber('2023 год');
isNumber('ECMAScript 2022');
isNumber('1 кефир, 0.5 батона');
isNumber('агент 007');
isNumber('а я томат');
isNumber(2023);
isNumber(-1);
isNumber(1.5);

// Функция, которая принимает три параметра:
// исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины.
// Символы добавляются в начало строки. Если исходная строка превышает заданную длину, она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца.

const getAddress = (string, stringLength, symbols) => {
  let result = '';
  const symbolsCount = stringLength - string.length; // Количество добивочных символов
  const cutSymbols = symbols.slice(0, symbolsCount);

  // Если исходная строка меньше указанной длины, то добавляем символы в начало строки

  if (string.length < stringLength && symbols.length <= stringLength) {
    result = symbols.repeat(symbolsCount).slice(-symbolsCount) + string;
  }

  // Если «добивка» слишком длинная, она обрезается с конца.

  if (symbols.length > stringLength) {
    result += cutSymbols + string;
  }

  // Если исходная строка превышает заданную длину, она не должна обрезаться.

  if (string.length >= stringLength) {
    result = string;
  }

  return result;
};

getAddress('1', 2, '0'); // 01
getAddress('1', 4, '0'); // 0001
getAddress('q', 4, 'werty'); // werq
getAddress('q', 4, 'we'); // eweq
getAddress('qwerty', 4, '0'); // qwerty

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
// Будет использоваться для генерации временных географических координат в следующем задании.

const getRandomNumber = (startNumber, endNumber, simbolsAfterComma) => {

  if ((startNumber < 0) || (endNumber < 0)) {
    return NaN;
  }

  let result = (Math.random() * (endNumber - startNumber) + startNumber).toFixed(simbolsAfterComma);
  if (endNumber <= startNumber) {
    result = (Math.random() * (startNumber - endNumber) + endNumber).toFixed(simbolsAfterComma);
  }

  return result;
};

getRandomNumber(1, 10, 2);
getRandomNumber(5, 5, 10);
getRandomNumber(5, 1, 10);
getRandomNumber(-5, 1, 10);
