import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
} from '@typegoose/typegoose';
import { City } from '../../../models/index.js';
import { UserEntity } from '../user/user.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ type: String, required: true, trim: true })
  public description!: CreateOfferDto['description'];

  @prop({ type: String, required: true, enum: City })
  public city!: CreateOfferDto['city'];

  @prop({ type: String, required: true, trim: true })
  public name!: CreateOfferDto['name'];

  @prop({ required: true, type: String, trim: true })
  public previewUrl!: CreateOfferDto['previewUrl'];

  @prop({ required: true, default: [] })
  public images!: CreateOfferDto['images'];

  @prop({ type: Number, required: true, default: 0 })
  public rating!: CreateOfferDto['rating'];

  @prop({ type: Number, required: true })
  public rooms!: CreateOfferDto['rooms'];

  @prop({ required: true })
  public coordinates!: CreateOfferDto['coordinates'];

  @prop({ type: Number, required: true })
  public price!: CreateOfferDto['price'];

  @prop({ type: Boolean, default: false })
  public premium!: CreateOfferDto['premium'];

  @prop({ type: Boolean, default: false })
  public favorite!: CreateOfferDto['favorite'];

  @prop({ required: true, default: [] })
  public features!: CreateOfferDto['features'];

  @prop({ type: String, required: true })
  public housing!: CreateOfferDto['housing'];

  @prop({ type: Number, required: true })
  public guests!: CreateOfferDto['guests'];

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: CreateOfferDto['userId'];

  @prop({ required: false, type: Number, default: 0 })
  public commentsAmount: CreateOfferDto['commentsAmount'];

  constructor(offerData: CreateOfferDto) {
    super();

    this.name = offerData.name;
    this.description = offerData.description;
    this.city = offerData.city;
    this.previewUrl = offerData.previewUrl;
    this.images = offerData.images;
    this.rating = offerData.rating;
    this.rooms = offerData.rooms;
    this.coordinates = offerData.coordinates;
    this.price = offerData.price;
    this.premium = offerData.premium;
    this.favorite = offerData.favorite;
    this.features = offerData.features;
    this.housing = offerData.housing;
    this.guests = offerData.guests;
    this.userId = offerData.userId;
    this.commentsAmount = offerData.commentsAmount;
  }
}

export const OfferModel = getModelForClass(OfferEntity);
