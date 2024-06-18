import { injectable } from 'inversify';
import { Logger as PinoInstance, pino, transport } from 'pino';
import path from 'node:path';
import type { Logger } from './logger.interface.js';
import { getCurrentModuleDirectoryPath } from '../../../utils/index.js';

@injectable()
class AppLogger implements Logger {
  private logger: PinoInstance;

  constructor() {
    const filePath = getCurrentModuleDirectoryPath();
    const logFilePath = 'logs/app.log';
    const destination = path.resolve(filePath, '../../', logFilePath);

    const multiTransport = transport({
      targets: [
        {
          target: 'pino/file',
          options: { destination },
          level: 'debug',
        },
        {
          target: 'pino/file',
          level: 'info',
          options: {},
        },
      ],
    });

    this.logger = pino({}, multiTransport);
    this.logger.info('Logger created…');
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }
}

export { AppLogger };
