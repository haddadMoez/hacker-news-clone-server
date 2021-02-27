import mongoose, { Schema } from 'mongoose';
import { ApolloError } from 'apollo-server';
import _ from 'lodash';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from '../constants';

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

userSchema.pre('validate', function (next) {
  if (_.size(this.password) < 8)
    throw new ApolloError(
      'Password must have at least 8 characters',
      StatusCodes.BAD_REQUEST
    );

  if (!/[0-9]/.test(this.password))
    throw new ApolloError(
      'Password must have a number',
      StatusCodes.BAD_REQUEST
    );

  if (!/[a-z]/.test(this.password))
    throw new ApolloError(
      'Password must have a lower case letter',
      StatusCodes.BAD_REQUEST
    );

  if (!/[A-Z]/.test(this.password))
    throw new ApolloError(
      'Password must have an upper case letter',
      StatusCodes.BAD_REQUEST
    );

  next();
});

userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(7));
  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.createAccessToken = async function () {
  return jwt.sign(_.pick(this, ['_id', 'email', 'name']), PRIVATE_KEY, {
    expiresIn: '7d',
  });
};

userSchema.statics.findByAccessToken = async function (token) {
  try {
    if (_.isEmpty(token)) return null;

    const payload = jwt.verify(tken, PRIVATE_KEY);

    const user = await this.findOne({ _id: payload._id });

    if (_.isEmpty(user)) return null;

    return user;
  } catch (error) {}
};

export const User = mongoose.model('User', userSchema);
