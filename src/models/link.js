import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const linkSchema = new Schema(
  {
    description: {
      type: String,
      trim: true,
    },
    url: { type: String, trim: true },
    postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    votes: [{ type: Schema.Types.ObjectId, ref: 'Vote' }],
  },
  { timestamps: true }
);

export const Link = mongoose.model('Link', linkSchema);
