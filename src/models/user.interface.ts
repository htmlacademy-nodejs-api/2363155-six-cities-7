type UserType = 'plain' | 'pro';

interface User {
  name: string;
  email: string;
  avatarUrl: string;
  password: string;
  type: UserType;
}

export type { User, UserType };
