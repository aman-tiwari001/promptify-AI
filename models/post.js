import { Schema, model, models } from 'mongoose';

const PostSchema = new Schema({
  prompt: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: 'default',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User Id is required.'],
  },
});

const Post = models.Post || model('Post', PostSchema);
export default Post;
