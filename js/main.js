// Функция для генерации случайного числа из диапазона

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция для генерации адреса

const getAvatarAddress = () => {
  let result = getRandomInteger(1, 10);
  if (result < 10) {
    result = `0${ result}`;
  }
  const avatarAddress = `img/avatars/user${result}.png`;
  return avatarAddress;
};

getAvatarAddress();

// Функция для создания объекта с автором

const createAuthor = () => {
  return {
    avatar: getAvatarAddress()
  };
}

console.log(
  createAuthor()
);

