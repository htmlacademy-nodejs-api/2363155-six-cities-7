import { inject, injectable } from 'inversify';
import { Logger } from '../../logger/index.js';
import { Config, ConfigSchema } from '../../config/index.js';
import { getFullServerPath } from '../../../utils/service.js';
import { Component } from '../../../models/component.enum.js';
import {
  DEFAULT_STATIC_IMAGES,
  STATIC_FILES_ROUTE,
  STATIC_RESOURCE_FIELDS,
  STATIC_UPLOAD_ROUTE,
} from '../../../constants/static.js';

function isObject(value: unknown): value is Record<string, object> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

@injectable()
export class PathTransformer {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<ConfigSchema>,
  ) {
    this.logger.info('PathTranformer created!');
  }

  private hasDefaultImage(value: string) {
    return DEFAULT_STATIC_IMAGES.includes(value);
  }

  private isStaticProperty(property: string) {
    return STATIC_RESOURCE_FIELDS.includes(property);
  }

  private getStaticPath(value: string) {
    const serverHost = this.config.get('HOST');
    const serverPort = this.config.get('PORT');

    const rootPath = this.hasDefaultImage(value)
      ? STATIC_FILES_ROUTE
      : STATIC_UPLOAD_ROUTE;
    return `${getFullServerPath(serverHost, serverPort)}${rootPath}/${value}`;
  }

  public execute(data: Record<string, unknown>): Record<string, unknown> {
    const stack = [data];
    while (stack.length > 0) {
      const current = stack.pop();

      for (const key in current) {
        if (Object.hasOwn(current, key)) {
          const value = current[key];

          if (isObject(value)) {
            stack.push(value);
            continue;
          }

          if (this.isStaticProperty(key)) {
            if (typeof value === 'string') {
              current[key] = this.getStaticPath(value);
            } else if (Array.isArray(value)) {
              current[key] = value.map((item) =>
                typeof item === 'string' ? this.getStaticPath(item) : item,
              );
            }
          }
        }
      }
    }

    return data;
  }
}
