import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
import { User } from '../user/model';
import { Freet } from '../freet/model';

export type Comment = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  freetId: Types.ObjectId;
  authorId: Types.ObjectId;
  datePosted: Date;
  content: string;
};

export type PopulatedComment = {
  _id: Types.ObjectId; 
  freetId: Freet;
  authorId: User;
  datePosted: Date;
  content: string;
};

const CommentSchema = new Schema({
  freetId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Freet'
  },
  authorId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  datePosted: {
    type: Date,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, {
    toObject: { virtuals: true, versionKey: false },
    toJSON: { virtuals: true, versionKey: false }
});

// what does this do?
// CommentSchema.index({ freetId: 1, authorId: 1, content: 1 }, { unique: false })

const CommentModel = model<Comment>('Comment', CommentSchema);
export default CommentModel;
