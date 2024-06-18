import type { OfferGenerator } from './offer-generator.interface.js';
import type { MockServerData, UserType } from '../../models/index.js';
import {
  getRandomNumberInRange,
  getRandomArrayItem,
  getRandomArrayItems,
  getRandomDate,
  getRandomBoolean,
  getRandomFloatInRange,
} from '../../utils/index.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_RATE = 1;
const MAX_RATE = 5;

const MIN_ROOMS = 1;
const MAX_ROOMS = 8;

const MIN_GUESTS = 1;
const MAX_GUESTS = 10;

const MIN_LATITUDE = -90;
const MAX_LATITUDE = 90;

const MIN_LONGITUDE = -180;
const MAX_LONGITUDE = 180;

const COORDINATES_FRACTION_DIGITS = 6;

const OFFER_IMAGES_AMOUNT = 6;

const ARRAY_DELIMITER = ';';
const USER_TYPES: UserType[] = ['plain', 'pro'];

class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const name = getRandomArrayItem<string>(this.mockData.offerNames);
    const features = getRandomArrayItems<string>(this.mockData.features).join(
      ARRAY_DELIMITER,
    );
    const description = getRandomArrayItem<string>(this.mockData.descriptions);
    const images = getRandomArrayItems<string>(
      this.mockData.images,
      OFFER_IMAGES_AMOUNT,
    );
    const city = getRandomArrayItem(this.mockData.cities);
    const housing = getRandomArrayItem(this.mockData.housingTypes);
    const price = getRandomNumberInRange(MIN_PRICE, MAX_PRICE).toString();
    const date = getRandomDate().toISOString();
    const authorName = getRandomArrayItem<string>(this.mockData.names);
    const password = getRandomArrayItem(this.mockData.passwords);
    const authorEmail = getRandomArrayItem(this.mockData.emails);
    const avatarUrl = getRandomArrayItem(this.mockData.avatars);
    const previewUrl = getRandomArrayItem(this.mockData.previews);
    const premium = getRandomBoolean();
    const favorite = getRandomBoolean();
    const rating = getRandomNumberInRange(MIN_RATE, MAX_RATE);
    const rooms = getRandomNumberInRange(MIN_ROOMS, MAX_ROOMS);
    const guests = getRandomNumberInRange(MIN_GUESTS, MAX_GUESTS);
    const latitude = getRandomFloatInRange(
      MIN_LATITUDE,
      MAX_LATITUDE,
      COORDINATES_FRACTION_DIGITS,
    ).toString();
    const longitude = getRandomFloatInRange(
      MIN_LONGITUDE,
      MAX_LONGITUDE,
      COORDINATES_FRACTION_DIGITS,
    ).toString();
    const userType = getRandomArrayItem(USER_TYPES);

    return [
      name,
      description,
      date,
      city,
      previewUrl,
      images,
      premium,
      favorite,
      rating,
      housing,
      rooms,
      guests,
      price,
      features,
      authorName,
      authorEmail,
      avatarUrl,
      password,
      userType,
      latitude,
      longitude,
    ].join('\t');
  }
}

export { TSVOfferGenerator };
