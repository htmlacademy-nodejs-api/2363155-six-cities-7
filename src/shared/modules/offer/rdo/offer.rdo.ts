import { Expose, Type } from 'class-transformer';
import { Offer } from '../../../models/offer.interface.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';

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
  public favourite!: Offer['favorite'];

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

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  public author!: UserRdo;

  @Expose()
  public coordinates!: Offer['coordinates'];

  @Expose()
  public rating!: Offer['rating'];

  @Expose()
  public commentsAmount!: Offer['commentsAmount'];

  @Expose()
  public createdAt!: Offer['createdAt'];
}

export { OfferRdo };
