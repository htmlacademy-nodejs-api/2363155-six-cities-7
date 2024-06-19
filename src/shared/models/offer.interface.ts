import { User } from './user.interface.js';

enum City {
  Paris = 'Paris',
  Amsterdam = 'Amsterdam',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

enum Housing {
  Apartment = 'apartment',
  House = 'house',
  Room = 'room',
  Hotel = 'hotel',
}

enum Feature {
  Breakfast = 'Breakfast',
  AirConditioning = 'Air conditioning',
  LaptopFriendlyWorkspace = 'Laptop friendly workspace',
  BabySeat = 'Baby seat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge',
}

type Coordinates = {
  lat: number;
  lng: number;
};

interface Offer {
  name: string;
  description: string;
  createdAt: Date;
  city: City;
  previewUrl: string;
  images: string[];
  premium: boolean;
  favorite: boolean;
  housing: Housing;
  rooms: number;
  guests: number;
  price: number;
  features: Feature[];
  author: User;
  rating: number;
  commentsAmount?: number;
  coordinates: Coordinates;
}

type OfferReduced = Pick<
  Offer,
  | 'name'
  | 'city'
  | 'previewUrl'
  | 'price'
  | 'housing'
  | 'createdAt'
  | 'favorite'
  | 'premium'
  | 'rating'
  | 'commentsAmount'
>;

export type { Offer, OfferReduced, Coordinates };
export { City, Feature, Housing };
