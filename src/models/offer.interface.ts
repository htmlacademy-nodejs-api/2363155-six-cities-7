import { User } from './user.interface.js';

type City =
  | 'Paris'
  | 'Amsterdam'
  | 'Cologne'
  | 'Brussels'
  | 'Hamburg'
  | 'Dusseldorf';

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
  date: string;
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

export type { Offer, Feature, City, Coordinates, Housing };
