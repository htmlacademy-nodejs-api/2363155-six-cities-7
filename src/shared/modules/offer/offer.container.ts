import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { OfferService } from './offer-service.interface.js';
import { Component } from '../../models/component.enum.js';
import { DefaultOfferService } from './offer.service.js';
import { OfferEntity, OfferModel } from './offer.entity.js';
import { OfferController } from './offer.controller.js';

const createOfferContainer = () => {
  const offerContainer = new Container();
  offerContainer
    .bind<OfferService>(Component.OfferService)
    .to(DefaultOfferService)
    .inSingletonScope();

  offerContainer
    .bind<types.ModelType<OfferEntity>>(Component.OfferModel)
    .toConstantValue(OfferModel);

  offerContainer
    .bind(Component.OfferController)
    .to(OfferController)
    .inSingletonScope();

  return offerContainer;
};

export { createOfferContainer };
