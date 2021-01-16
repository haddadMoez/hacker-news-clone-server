const mongoose = require('mongoose');
const { Schema } = mongoose;

const voteSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    link: { type: Schema.Types.ObjectId, ref: 'Link' },
  },
  { timestamps: true }
);

export const Vote = mongoose.model('Vote', voteSchema);
