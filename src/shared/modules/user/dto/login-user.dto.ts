import { User } from '../../../models/user.interface.js';

class LoginUserDto {
  public email!: User['email'];
  public password!: string;
}

export { LoginUserDto };
