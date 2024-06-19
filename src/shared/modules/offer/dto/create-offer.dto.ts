import { Offer } from '../../../models/offer.interface.js';

class CreateOfferDto {
  public name!: Offer['name'];
  public description!: Offer['description'];
  public city!: Offer['city'];
  public premium!: Offer['premium'];
  public housing!: Offer['housing'];
  public rooms!: Offer['rooms'];
  public guests!: Offer['guests'];
  public price!: Offer['price'];
  public features!: Offer['features'];
  public coordinates!: Offer['coordinates'];
}

export { CreateOfferDto };
