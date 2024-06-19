import { User } from '../../../models/user.interface.js';

class UpdateUserDto {
  public avatarUrl?: User['avatarUrl'];
}

export { UpdateUserDto };
