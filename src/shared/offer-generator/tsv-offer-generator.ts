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

const Price = {
  MIN: 100,
  MAX: 100000,
};

const Rate = {
  MIN: 1,
  MAX: 5,
};

const Rooms = {
  MIN: 1,
  MAX: 8,
};

const Guests = {
  MIN: 1,
  MAX: 10,
};

const Latitude = {
  MIN: -90,
  MAX: 90,
};

const Longitude = {
  MIN: -180,
  MAX: 180,
};

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
    const price = getRandomNumberInRange(Price.MIN, Price.MAX).toString();
    const date = getRandomDate().toISOString();
    const authorName = getRandomArrayItem<string>(this.mockData.names);
    const password = getRandomArrayItem(this.mockData.passwords);
    const authorEmail = getRandomArrayItem(this.mockData.emails);
    const avatarUrl = getRandomArrayItem(this.mockData.avatars);
    const previewUrl = getRandomArrayItem(this.mockData.previews);
    const premium = getRandomBoolean();
    const favorite = getRandomBoolean();
    const rating = getRandomNumberInRange(Rate.MIN, Rate.MAX);
    const rooms = getRandomNumberInRange(Rooms.MIN, Rooms.MAX);
    const guests = getRandomNumberInRange(Guests.MIN, Guests.MAX);
    const latitude = getRandomFloatInRange(
      Latitude.MIN,
      Latitude.MAX,
      COORDINATES_FRACTION_DIGITS,
    ).toString();
    const longitude = getRandomFloatInRange(
      Longitude.MIN,
      Longitude.MAX,
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
