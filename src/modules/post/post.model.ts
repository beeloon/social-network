import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  title: { type: String, requiered: true },
  text: { type: String, required: true },
});

export interface IPost extends mongoose.Document {
  id: string;
  title: string;
  text: string;
  // ownerId: string;
}
