import Joi from 'joi';
import { CreateOfferDto } from './create-offer.dto.js';
import { offerDtoSchemaObject } from './offer.dto.schema.js';

const createOfferDtoSchema = Joi.object<InstanceType<typeof CreateOfferDto>>(
  offerDtoSchemaObject,
)
  .fork(Object.keys(offerDtoSchemaObject), (schema) => schema.required())
  .keys({
    userId: Joi.string().required(),
  });

export { createOfferDtoSchema };
