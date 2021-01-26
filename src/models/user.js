import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { ApolloError } from 'apollo-server';
import _ from 'lodash';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';

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

  const salt = bcrypt.genSaltSync(7);
  this.password = bcrypt.hashSync(this.password, salt);

  next();
});

export const User = mongoose.model('User', userSchema);
