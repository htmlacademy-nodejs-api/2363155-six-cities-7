import { Expose } from 'class-transformer';
import { OfferReduced } from '../../../models/offer.interface.js';

class OfferReducedRdo {
  @Expose()
  public id!: string;

  @Expose()
  public name!: OfferReduced['name'];

  @Expose()
  public city!: OfferReduced['city'];

  @Expose()
  public previewUrl!: OfferReduced['previewUrl'];

  @Expose()
  public premium!: OfferReduced['premium'];

  @Expose()
  public favourite!: OfferReduced['favorite'];

  @Expose()
  public housing!: OfferReduced['housing'];

  @Expose()
  public price!: OfferReduced['price'];

  @Expose()
  public rating!: OfferReduced['rating'];

  @Expose()
  public commentsAmount!: OfferReduced['commentsAmount'];

  @Expose()
  public createdAt!: OfferReduced['createdAt'];
}

export { OfferReducedRdo };
