import { Expose } from 'class-transformer';

class LoggedUserRdo {
  @Expose()
  public email!: string;

  @Expose()
  public token!: string;
}

export { LoggedUserRdo };
