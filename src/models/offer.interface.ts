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

type Feature =
  | 'Breakfast'
  | 'Air conditioning'
  | 'Laptop friendly workspace'
  | 'Baby seat'
  | 'Washer'
  | 'Towels'
  | 'Fridge';

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
  rating: number;
  housing: Housing;
  rooms: number;
  guests: number;
  price: number;
  features: Feature[];
  author: User;
  commentsAmount?: number;
  coordinates: Coordinates;
}

export type { Offer, Feature, Coordinates, Housing };
export { City };
