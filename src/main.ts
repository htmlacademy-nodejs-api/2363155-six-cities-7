import 'reflect-metadata';
import { Container } from 'inversify';
import { Application } from './application/index.js';
import { Component } from './models/component.enum.js';
import { createApplicationContainer } from './application/application.container.js';
// import { createUserContainer } from './shared/modules/user/user.container.js';
import { createOfferContainer } from './shared/modules/offer/offer.container.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createApplicationContainer(),
    // createUserContainer(),
    createOfferContainer(),
  );
  const application = appContainer.get<Application>(Component.Application);
  await application.init();
}

bootstrap();
