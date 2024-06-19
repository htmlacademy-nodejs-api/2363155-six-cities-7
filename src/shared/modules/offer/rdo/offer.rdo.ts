import { Expose } from 'class-transformer';
import { Offer } from '../../../models/offer.interface.js';

class OfferRdo {
  @Expose()
  public id!: string;

  @Expose()
  public name!: Offer['name'];

  @Expose()
  public description!: Offer['description'];

  @Expose()
  public city!: Offer['city'];

  @Expose()
  public previewUrl!: Offer['previewUrl'];

  @Expose()
  public images!: Offer['images'];

  @Expose()
  public premium!: Offer['premium'];

  @Expose()
  public housing!: Offer['housing'];

  @Expose()
  public rooms!: Offer['rooms'];

  @Expose()
  public guests!: Offer['guests'];

  @Expose()
  public price!: Offer['price'];

  @Expose()
  public features!: Offer['features'];

  @Expose()
  public userId!: string;

  @Expose()
  public coordinates!: Offer['coordinates'];
}

export { OfferRdo };
