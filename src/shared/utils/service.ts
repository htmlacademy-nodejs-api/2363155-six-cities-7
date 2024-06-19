import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationErrorItem } from 'joi';
import { ErrorObject } from '../models/error-object.type.js';
import { HttpError } from '../libs/rest/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import {
  OffersFindFilterParams,
  OffersFindQueryParams,
} from '../modules/offer/offer-service.interface.js';
import { City } from '../models/offer.interface.js';
import { RequestOffersQuery } from '../modules/offer/offer-request.type.js';
import { SortType } from '../models/sort-type.enum.js';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png'];

function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {
    excludeExtraneousValues: true,
  });
}

interface CreateErrorObjectParams {
  title: string;
  detail?: string;
  constraints?: ValidationErrorItem[];
  reference?: string;
}

function createErrorObject({
  title,
  detail,
  constraints,
  reference,
}: CreateErrorObjectParams): ErrorObject {
  const errorObject: ErrorObject = {
    title,
  };

  if (detail) {
    errorObject.detail = detail;
  }

  if (constraints) {
    errorObject.constraints = constraints.map((item) => ({
      name: item.context?.key || '',
      message: item.message,
      type: item.type,
    }));
  }

  if (reference) {
    errorObject.reference = reference;
  }

  return errorObject;
}

function getFullServerPath(serverHost: string, serverPort: number) {
  return `http://${serverHost}:${serverPort}`;
}

function checkFileMimeType(mimeType: string) {
  if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
    throw new HttpError(
      StatusCodes.UNSUPPORTED_MEDIA_TYPE,
      'File type is not allowed',
      `Allowed types: ${ALLOWED_MIME_TYPES.join(', ')}`,
    );
  }
  return true;
}

function parseOffersQuery(params: RequestOffersQuery): {
  query: OffersFindQueryParams;
  filter: OffersFindFilterParams;
} {
  const { limit, offset, sort, ...filter } = params;
  return {
    query: {
      limit: limit ? parseInt(limit, 10) : undefined,
      offset: offset ? parseInt(offset, 10) : undefined,
      sort: sort ? (parseInt(sort, 10) as SortType) : undefined,
    },
    filter: filter ? parseOfferFilterParams(filter) : {},
  };
}

type ParamsKeys = keyof OffersFindFilterParams;

function parseOfferFilterParams(params: {
  [K in ParamsKeys]?: string | undefined;
}): OffersFindFilterParams {
  const filter: OffersFindFilterParams = {};
  if (params.city) {
    filter.city = params.city as City;
  }
  if (params.premium) {
    filter.premium = params.premium === 'true';
  }
  return filter;
}

export {
  fillDTO,
  createErrorObject,
  getFullServerPath,
  checkFileMimeType,
  parseOffersQuery,
};
