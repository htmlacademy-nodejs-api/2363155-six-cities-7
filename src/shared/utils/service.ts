import { ClassConstructor, plainToInstance } from 'class-transformer';

function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {
    excludeExtraneousValues: true,
  });
}

function createErrorObject(message: string) {
  return {
    error: message,
  };
}

export { fillDTO, createErrorObject };
