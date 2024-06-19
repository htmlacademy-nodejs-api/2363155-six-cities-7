import * as mongoose from 'mongoose';
import { Comment } from '../../../../models/comment.interface.js';

class CreateCommentDto {
  public text!: Comment['text'];
  public offerId!: mongoose.Types.ObjectId;
  public userId!: mongoose.Types.ObjectId;
}

export { CreateCommentDto };
