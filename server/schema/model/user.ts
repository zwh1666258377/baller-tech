import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;
const Types = Schema.Types;

interface User {
  account: string;
  password: string;
}

const userSchema = new Schema({
  account: {
    type: Types.String,
    required: true,
  },
  password: {
    type: Types.String,
    required: true,
  },
});

export const UserSchema = mongoose.model<User & Document>('user', userSchema);
