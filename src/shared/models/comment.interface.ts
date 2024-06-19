import { User } from './user.interface.js';

interface Comment {
  text: string;
  createdAt: Date;
  rating: number;
  author: User;
}

export type { Comment };
