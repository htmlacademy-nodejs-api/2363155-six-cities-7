enum OfferEndpoint {
  Index = '/',
  PremiumOffers = '/premium',
  DetailedOffers = '/detailed', // For frontend only, it couldn't work with reduced offers
  Offer = '/:offerId',
  Comments = '/:offerId/comments',
  UploadImages = '/:offerId/images',
  UploadPreviewUrl = '/:offerId/preview',
}

export { OfferEndpoint };

