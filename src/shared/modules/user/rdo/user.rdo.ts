import { Expose } from 'class-transformer';
import { User } from '../../../models/user.interface.js';

export class UserRdo {
  @Expose()
  public email!: string;

  @Expose()
  public avatarUrl!: string;

  @Expose()
  public name!: string;

  @Expose()
  public type!: User['type'];
}
