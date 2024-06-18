import { Application } from './application/index.js';
import { Component } from './models/component.enum.js';
import { container } from './inversify.config.js';

async function bootstrap() {
  const application = container.get<Application>(Component.Application);
  await application.init();
}

bootstrap();
