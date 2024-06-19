import { Comment } from '../../../models/comment.interface.js';

class CreateCommentDto {
  public text!: Comment['text'];
}

export { CreateCommentDto };
