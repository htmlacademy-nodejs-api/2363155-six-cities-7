import { City, Comment, Location, Offer, User } from '../../types/types';
import { UserRdo } from '../../../../src/shared/modules/user/rdo/user.rdo';
import { OfferRdo } from '../../../../src/shared/modules/offer/rdo/offer.rdo';
import { CommentRdo } from '../../../../src/shared/modules/comment/rdo/comment.rdo';
import { UserType } from '../../const';

export const adaptUserToClient =
  (user: UserRdo): User => ({
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl,
    type: user.type as unknown as UserType,
  });

export const adaptOfferToClient = (offer: OfferRdo): Offer => ({
  id: offer.id,
  description: offer.description,
  images: offer.images,
  isPremium: offer.premium,
  isFavorite: offer.favorite,
  host: adaptUserToClient(offer.author),
  price: offer.price,
  rating: offer.rating,
  title: offer.name,
  location: {
    latitude: offer.coordinates.lat,
    longitude: offer.coordinates.lng,
  } as Location,
  city: {
    name: offer.city,
    location: {
      latitude: offer.coordinates.lat,
      longitude: offer.coordinates.lng,
    } as Location,
  } as unknown as City,
  previewImage: offer.previewUrl,
  type: offer.housing,
  bedrooms: offer.rooms,
  goods: offer.features,
  maxAdults: offer.guests,
});

export const adaptOffersToClient =
  (offers: OfferRdo[]): Offer[] =>
    offers
      .map(adaptOfferToClient);

export const adaptCommentToClient =
  (comment: CommentRdo): Comment =>({
    id: comment.id,
    comment: comment.text,
    date: comment.createdAt.toISOString(),
    rating: comment.rating,
    user: adaptUserToClient(comment.author),
  });

export const adaptCommentsToClient =
  (comments: CommentRdo[]): Comment[] =>
    comments
      .map(adaptCommentToClient);
