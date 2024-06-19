import { User } from '../../../models/user.interface.js';

class CreateUserDto {
  public email!: User['email'];
  public name!: User['name'];
  public type!: User['type'];
  public password!: string;
}

export { CreateUserDto };

