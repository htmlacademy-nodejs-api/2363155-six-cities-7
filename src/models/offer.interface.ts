import { User } from './user.interface.js';

enum City {
  Paris = 'Paris',
  Amsterdam = 'Amsterdam',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

type Housing = 'apartment' | 'house' | 'room' | 'hotel';

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
  commentsAmount?: number;
  coordinates: Coordinates;
}

export type { Offer, Coordinates, Housing };
export { City, Feature };
