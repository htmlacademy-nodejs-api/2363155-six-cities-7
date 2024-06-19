import * as mongoose from 'mongoose';
import { Offer } from '../../../../models/offer.interface.js';

class CreateOfferDto {
  public name!: Offer['name'];
  public description!: Offer['description'];
  public city!: Offer['city'];
  public previewUrl!: Offer['previewUrl'];
  public images!: Offer['images'];
  public premium!: Offer['premium'];
  public favorite!: Offer['favorite'];
  public rating!: Offer['rating'];
  public housing!: Offer['housing'];
  public rooms!: Offer['rooms'];
  public guests!: Offer['guests'];
  public price!: Offer['price'];
  public features!: Offer['features'];
  public userId!: mongoose.Types.ObjectId;
  public commentsAmount?: Offer['commentsAmount'];
  public coordinates!: Offer['coordinates'];
}

export { CreateOfferDto };
