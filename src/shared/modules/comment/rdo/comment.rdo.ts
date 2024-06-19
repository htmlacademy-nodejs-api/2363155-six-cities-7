import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo.js';

class CommentRdo {
  @Expose()
  public id!: string;

  @Expose()
  public text!: string;

  @Expose()
  public createdAt!: Date;

  @Expose()
  public rating!: number;

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  public author!: UserRdo;
}

export { CommentRdo };
