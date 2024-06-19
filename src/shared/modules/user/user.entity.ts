import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
} from '@typegoose/typegoose';

import { User, UserType } from '../../models/index.js';
import { createSHA256 } from '../../utils/hash.js';
import { DocumentCollection } from '../../libs/rest/types/document-collection.enum.js';
import * as mongoose from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: DocumentCollection.Users,
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ unique: true, required: true, trim: true })
  public email: string;

  @prop({ required: false, trim: true })
  public avatarUrl: string;

  @prop({ required: true, trim: true })
  public name: string;

  @prop({ required: true, type: () => String, enum: UserType })
  public type: UserType;

  @prop({ required: true })
  private _password?: string;

  @prop({ type: Array, required: true, default: [], ref: 'OfferEntity' })
  public favoriteOffers: mongoose.Types.ObjectId[] = [];

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.avatarUrl = userData.avatarUrl;
    this.name = userData.name;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string) {
    this._password = createSHA256(password, salt);
  }

  public get password() {
    return this._password;
  }
}

export const UserModel = getModelForClass(UserEntity);
