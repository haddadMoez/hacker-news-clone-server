const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: '{PATH} is required!', trim: true },
    email: {
      type: String,
      required: '{PATH} is required!',
      unique: true,
      trim: true,
    },
    password: { type: String, required: '{PATH} is required!' },
    links: [{ type: Schema.Types.ObjectId, ref: 'Link' }],
    votes: [{ type: Schema.Types.ObjectId, ref: 'Vote' }],
  },
  { timestamps: true }
);

userSchema.path('email').validate(function (email) {
  const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email);
}, 'Invalid email.');

exports.User = mongoose.model('Link', userSchema);
