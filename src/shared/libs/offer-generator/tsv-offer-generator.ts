import type { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData, UserType } from '../../models/index.js';
import {
  getRandomNumberInRange,
  getRandomArrayItem,
  getRandomArrayItems,
  getRandomDate,
  getRandomBoolean,
  getRandomFloatInRange,
} from '../../utils/index.js';
import {
  COORDINATES_FRACTION_DIGITS,
  Guests,
  Latitude,
  Longitude,
  OFFER_IMAGES_AMOUNT,
  Price,
  Rate,
  Rooms,
} from '../../constants/offer.js';

const ARRAY_DELIMITER = ';';
const USER_TYPES: UserType[] = [UserType.Plain, UserType.Pro];

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
    const authorEmail = getRandomArrayItem(this.mockData.emails);
    const password = getRandomArrayItem(this.mockData.passwords);
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
      password,
      authorEmail,
      avatarUrl,
      userType,
      latitude,
      longitude,
    ].join('\t');
  }
}

export { TSVOfferGenerator };
