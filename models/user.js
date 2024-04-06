import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  username: {
    type: String,
    unique: [true, 'Username should be unique'],
    required: [true, 'Username is required'],
  },
  email: {
    type: String,
    unique: [true, 'Email should be unique'],
    required: [true, 'Email is required'],
  },
  image: {
    type: String,
  }
});

const User = models.User || model('User', UserSchema);
export default User;