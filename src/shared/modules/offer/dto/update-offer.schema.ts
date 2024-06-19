import Joi from 'joi';

import { UpdateOfferDto } from './update-offer.dto.js';
import { offerDtoSchemaObject } from './offer.dto.schema.js';

const updateOfferDtoSchema = Joi.object<InstanceType<typeof UpdateOfferDto>>(
  offerDtoSchemaObject,
).fork(Object.keys(offerDtoSchemaObject), (schema) => schema.optional());

export { updateOfferDtoSchema };
