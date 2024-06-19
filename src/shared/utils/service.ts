import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationErrorItem } from 'joi';
import { ErrorObject } from '../models/error-object.type.js';

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

export { fillDTO, createErrorObject };
