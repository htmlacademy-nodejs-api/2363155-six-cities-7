import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
} from '@typegoose/typegoose';
import { City } from '../../models/index.js';
import { UserEntity } from '../user/user.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { calculateAggregateRating } from '../../utils/rating.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
    virtuals: true,
    overwriteModels: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ type: String, required: true, trim: true })
  public description: CreateOfferDto['description'];

  @prop({ type: String, required: true, enum: City })
  public city: CreateOfferDto['city'];

  @prop({ type: String, required: true, trim: true })
  public name: CreateOfferDto['name'];

  @prop({ type: String, required: true, trim: true })
  public previewUrl: CreateOfferDto['previewUrl'];

  @prop({ type: Array, required: true, default: [] })
  public images: CreateOfferDto['images'];

  @prop({ type: Number, required: true })
  public rooms: CreateOfferDto['rooms'];

  @prop({ required: true })
  public coordinates: CreateOfferDto['coordinates'];

  @prop({ type: Number, required: true })
  public price: CreateOfferDto['price'];

  @prop({ type: Boolean, default: false })
  public premium: CreateOfferDto['premium'];

  @prop({ type: Array, required: true, default: [] })
  public features: CreateOfferDto['features'];

  @prop({ type: String, required: true })
  public housing: CreateOfferDto['housing'];

  @prop({ type: Number, required: true })
  public guests: CreateOfferDto['guests'];

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId: CreateOfferDto['userId'];

  @prop({ type: Number, required: false })
  public commentsAmount: number = 0;

  @prop({ type: Array, required: true, default: [] })
  public usersFavorite = [];

  @prop({ type: Array, required: true, default: [] })
  public usersRatings = [];

  public get rating(): number {
    return calculateAggregateRating(this.usersRatings);
  }

  constructor(offerData: CreateOfferDto) {
    super();

    this.name = offerData.name;
    this.description = offerData.description;
    this.city = offerData.city;
    this.previewUrl = offerData.previewUrl;
    this.images = offerData.images;
    this.rooms = offerData.rooms;
    this.coordinates = offerData.coordinates;
    this.price = offerData.price;
    this.premium = offerData.premium;
    this.features = offerData.features;
    this.housing = offerData.housing;
    this.guests = offerData.guests;
    this.userId = offerData.userId;
  }
}

export const OfferModel = getModelForClass(OfferEntity);
