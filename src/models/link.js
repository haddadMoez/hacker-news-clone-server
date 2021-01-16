const mongoose = require('mongoose');
const { Schema } = mongoose;

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

linkSchema.path('url').validate((url) => {
  urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(url);
}, 'Invalid URL.');

export const Link = mongoose.model('Link', linkSchema);
