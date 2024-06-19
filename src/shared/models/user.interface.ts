enum UserType {
  Plain = 'plain',
  Pro = 'pro',
}
interface User {
  name: string;
  email: string;
  avatarUrl: string;
  type: UserType;
  password?: string;
}

export type { User };
export { UserType };
