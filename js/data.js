import {getGeolocation, getRandomInteger, getRandomArrayElement, getArray, createRandomIdFromRangeGenerator} from './util.js';

const TITLES = [
  'Снежное иглу с настоящими кексокроватями',
  'Роскошный просторный люкс для двоих',
  'Уникальный глемпинг рядом с Кембриджем',
  'Отдельный садовый кексодом в окружении природы',
  'Дом с обширным частным садом и собственной гидромассажной ванной',
  'Плавающая хижина в Пруде Верша',
  'Специально переоборудованный вертолёт Lynx со всеми удобствами - мечта каждого кота от шести до шестидесети!',
  'Остановитесь в нашем уникальном доме на дереве с ванной и душем на открытом воздухе',
  'Дом на открытом воздухе с бассейном',
  'Богемная квартира с двумя спальнями на юге Кексобурга'
];

const TYPES_OF_HOUSING = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const CHECKIN_OR_CHECKOUT = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const DESCRIPTIONS = [
  'Наслаждайтесь закусками и напитками с уникальным видом на Ньюве Виллемшевен и один из крупнейших приливных районов в мире: Вадденское море. Вадден Море особенное в своем роде. Не реже двух раз в день мир там меняется. В один миг вы найдете километры обширных грязевых платформ, а в другой - все под водой.',
  'Это ранее машинный номер, теперь полностью отреставрированный , просторный и полностью оформленный дизайнерский люкс с очень высоким уровнем комфорта.',
  'Красиво переоборудованная лодка 1945 года, расположенная в частном лесу с видом на красивую открытую сельскую местность. Идеальное место для пар, которые хотят отдохнуть, исследовать и посетить местные города. Жилье расположено в 15 минутах езды от Или и в 30 минутах от Кембриджа.',
  'Расположенный в Тервурене рядом с дендрарием (2 минуты ходьбы), La Vista является зеленым раем для любителей природы, гоночных и горных велосипедов, а также деловых путешественников.',
  'Роскошный дом уникального дизайна с обширным частным садом на верхнем уровне (с гидромассажной ванной, баром и видом на сельскую местность).',
  'Жильё расположено на Питерпаде и также может быть забронировано на 1 ночь. После вкусного завтрака (который нужно забронировать на месте) вы продолжите прогулку по этому прекрасному пешеходному маршруту.',
  'Это уютный отель, который расположен в своем собственном большом огороженном саду с дополнительным большим паддоком по соседству, который идеально подходит для тренировки вашего кота.',
  'Жилье имеет большую гостиную, столовую и кухню, выходящую на патио с видом на лошадиные породы, открытое поле и деревья.',
  'В конце пруда вы попадете в эту красивую плавающую хижину и отправитесь в дикую природу, чтобы полностью насладиться хижинами Coucoo Grands Reflets.',
  'Почему бы тебе не отдохнуть в нашем уютном хоббитском уединении. Совершенно уединенный и в собственном эксклюзивном районе, спрятанный в уголке славной сельской местности Чешира, идеальный уголок для романтического отдыха.'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const SIMILAR_ANNOUNCEMENTS_COUNT = 10;

const NUMBER_OF_USERS = 10;

const generateUserId = createRandomIdFromRangeGenerator(1, NUMBER_OF_USERS);

// Функция для создания объекта с адресом аватара

const createAuthor = () => {
  let result = generateUserId();
  if (result < NUMBER_OF_USERS) {
    result = `0${ result}`;
  }
  const avatarAddress = `img/avatars/user${result}.png`;
  return {
    avatar: avatarAddress
  };
};

// Функция для создания объекта с информацией об объявлении

let latitude;
let longitude;

const createOffer = () => {
  latitude = getGeolocation(35.65, 35.75, 5);
  longitude = getGeolocation(139.7, 139.8, 5);
  return {
    title: getRandomArrayElement(TITLES),
    address: `${latitude}, ${longitude}`,
    price: getRandomInteger(0, 500000),
    type: getRandomArrayElement(TYPES_OF_HOUSING),
    rooms: getRandomInteger(0, 10),
    guests: getRandomInteger(0, 25),
    checkin: getRandomArrayElement(CHECKIN_OR_CHECKOUT),
    checkout: getRandomArrayElement(CHECKIN_OR_CHECKOUT),
    features: getArray(FEATURES),
    description:getRandomArrayElement(DESCRIPTIONS),
    photos: getArray(PHOTOS)
  };
};

const createLocation = () => ({
  lat: latitude,
  lng: longitude
});

const createAnnouncement = () => ({
  author: createAuthor(),
  offer: createOffer(),
  location: createLocation()
});

const getSimilarAnnouncements = () => Array.from({length: SIMILAR_ANNOUNCEMENTS_COUNT}, createAnnouncement);

export {getSimilarAnnouncements};
