import dayjs from 'dayjs';

const CURRENT_YEAR = dayjs().year();

const getRandomNumberInRange = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomFloatInRange = (
  min: number,
  max: number,
  fractionDigits: number,
): number =>
  parseFloat((Math.random() * (max - min) + min).toFixed(fractionDigits));

const getRandomArrayItem = <T>(array: T[]): T =>
  array[getRandomNumberInRange(0, array.length - 1)];

const getRandomArrayItems = <T>(array: T[], count?: number): T[] => {
  const itemsCount = count ?? getRandomNumberInRange(1, array.length);
  const result = new Set<T>();
  while (result.size < itemsCount) {
    result.add(getRandomArrayItem(array));
  }
  return Array.from(result);
};

const getRandomDate = (): Date => dayjs().year(CURRENT_YEAR).toDate();

const getRandomBoolean = (): boolean => Boolean(getRandomNumberInRange(0, 1));

export {
  getRandomNumberInRange,
  getRandomArrayItem,
  getRandomArrayItems,
  getRandomDate,
  getRandomBoolean,
  getRandomFloatInRange,
};
