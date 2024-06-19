import Joi from 'joi';
import { AddFavoriteOfferDto } from './add-favorite-offer.dto.js';

const addFavoriteOfferDtoSchema = Joi.object<
  InstanceType<typeof AddFavoriteOfferDto>
>({
  offerId: Joi.string().required(),
});

export { addFavoriteOfferDtoSchema };
