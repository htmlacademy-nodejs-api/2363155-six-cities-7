import { City, Feature, Housing } from './offer.interface.js';

interface MockServerData {
  offerNames: [];
  names: string[];
  emails: string[];
  passwords: string[];
  cities: City[];
  housingTypes: Housing[];
  features: Feature[];
  descriptions: string[];
  avatars: string[];
  images: string[];
  previews: string[];
}

export type { MockServerData };
