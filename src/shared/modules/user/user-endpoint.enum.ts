enum UserEndpoint {
  SignUp = '/sign-up',
  LogIn = '/login',
  LogOut = '/logout',
  UserFavorites = '/favorites',
  UserFavoritesDetailed = '/favorites-detailed', // For frontend only, it couldn't work with reduced offers
  UserFavoriteOffer = '/favorites/:offerId',
  UploadAvatar = '/:userId/avatar',
}

export { UserEndpoint };

