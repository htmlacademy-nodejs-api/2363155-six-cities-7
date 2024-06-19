import { createReadStream } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import {
  City,
  Feature,
  Housing,
  Offer,
  User,
  UserType,
} from '../../../models/index.js';
import EventEmitter from 'node:events';

const DECIMAL_RADIX = 10;
const STRING_BOOLEANS = ['true', 'false'];

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384; // 16KB

  constructor(private readonly filename: string) {
    super();
  }

  private parseLineToOffer(line: string): Offer {
    const [
      name,
      description,
      date,
      city,
      previewUrl,
      images,
      premium,
      favorite,
      housing,
      rooms,
      guests,
      price,
      features,
      authorName,
      password,
      authorEmail,
      avatarUrl,
      userType,
      latitude,
      longitude,
      commentsAmount,
    ] = line.split('\t');

    return {
      name,
      description,
      createdAt: new Date(date),
      city: city as City,
      previewUrl,
      images: this.parseStringArray<string>(images),
      premium: this.parseBoolean(premium),
      favorite: this.parseBoolean(favorite),
      housing: housing as Housing,
      rooms: this.parseInteger(rooms),
      guests: this.parseInteger(guests),
      price: this.parseInteger(price),
      features: this.parseStringArray<Feature>(features),
      author: this.parseUser(
        authorName,
        authorEmail,
        avatarUrl,
        userType as UserType,
        password,
      ),
      commentsAmount: commentsAmount
        ? this.parseInteger(commentsAmount)
        : undefined,
      coordinates: {
        lat: this.parseFloat(latitude),
        lng: this.parseFloat(longitude),
      },
    };
  }

  private parseStringArray<T>(string: string): T[] {
    return string.split(';') as T[];
  }

  private parseInteger(string: string): number {
    return Number.parseInt(string, DECIMAL_RADIX);
  }

  private parseFloat(string: string): number {
    return Number.parseFloat(string);
  }

  private parseBoolean(string: string): boolean {
    if (!STRING_BOOLEANS.includes(string)) {
      throw new Error(`Invalid boolean value: ${string}`);
    }

    return string === STRING_BOOLEANS[0];
  }

  private parseUser(
    name: User['name'],
    email: User['email'],
    avatarUrl: User['avatarUrl'],
    type: User['type'],
    password: User['password'],
  ): User {
    return { name, email, avatarUrl, type, password };
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let data = '';
    let lineBreakPosition = -1;
    let linesCount = 0;

    readStream.on('readable', async () => {
      let chunk = readStream.read(this.CHUNK_SIZE);
      while (chunk !== null) {
        data += chunk;

        while ((lineBreakPosition = data.indexOf('\n')) >= 0) {
          const completeRow = data.slice(0, lineBreakPosition + 1);
          data = data.slice(++lineBreakPosition);
          linesCount++;

          const parsedOffer = this.parseLineToOffer(completeRow);
          this.emit('line', parsedOffer);
        }
        chunk = readStream.read(this.CHUNK_SIZE);
      }
    });

    readStream.once('end', () => {
      this.emit('end', linesCount);
    });
  }
}
