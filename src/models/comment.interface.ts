import { User } from './user.interface.js';

interface Comment {
  text: string;
  date: string;
  rating: number;
  author: User;
}

export type { Comment };
