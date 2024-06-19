import * as mongoose from 'mongoose';
import { Comment } from '../../../models/comment.interface.js';

class CreateCommentDto {
  public text!: Comment['text'];
  public userId!: mongoose.Types.ObjectId;
}

export { CreateCommentDto };
