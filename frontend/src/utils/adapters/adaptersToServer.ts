import { City, Feature, Housing } from '../../../../src/shared/models/offer.interface';
import { CreateOfferDto } from '../../../../src/shared/modules/offer/dto/create-offer.dto';
import { NewOffer, Offer } from '../../types/types';

const adaptNewOfferToServer = (offer: NewOffer): CreateOfferDto => ({
  name: offer.title,
  description: offer.description,
  price: offer.price,
  coordinates: {
    lat: offer.location.latitude,
    lng: offer.location.longitude,
  },
  city: offer.city.name as City,
  premium: offer.isPremium,
  rooms: offer.bedrooms,
  guests: offer.maxAdults,
  features: offer.goods as Feature[],
  housing: offer.type as Housing,
  images: offer.images,
  previewUrl: offer.previewImage,
});

const adaptOfferToServer = (offer: Offer): CreateOfferDto => ({
  name: offer.title,
  description: offer.description,
  price: offer.price,
  coordinates: {
    lat: offer.location.latitude,
    lng: offer.location.longitude,
  },
  city: offer.city.name as City,
  premium: offer.isPremium,
  rooms: offer.bedrooms,
  guests: offer.maxAdults,
  features: offer.goods as Feature[],
  housing: offer.type as Housing,
  images: offer.images,
  previewUrl: offer.previewImage,
});

export { adaptNewOfferToServer, adaptOfferToServer };
