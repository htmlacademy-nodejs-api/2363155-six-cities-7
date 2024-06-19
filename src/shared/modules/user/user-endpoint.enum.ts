enum UserEndpoint {
  SignUp = '/sign-up',
  LogIn = '/login',
  LogOut = '/logout',
  UserFavorites = '/:userId/favorites',
  RemoveFromFavorites = '/:userId/favorites/:offerId',
  UploadAvatar = '/:userId/avatar',
}

export { UserEndpoint };
