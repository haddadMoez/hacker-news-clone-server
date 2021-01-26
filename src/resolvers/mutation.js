import { ApolloError } from 'apollo-server';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
import { Link } from '../models/link';
import { User } from '../models/user';
import { isValid } from '../utils/validators/mail';
import { isValid as isValidLink } from '../utils/validators/link';

const post = async (parent, { description, url }) => {
  if (_.isEmpty(url))
    throw new ApolloError('Url is required!', StatusCodes.BAD_REQUEST);

  if (!isValidLink(url))
    throw new ApolloError('Invalid url!', StatusCodes.BAD_REQUEST);

  const link = new Link({ description, url });
  return link
    .save()
    .catch((err) => new ApolloError(err, StatusCodes.BAD_REQUEST));
};

const signup = async (parent, { email, name, password }) => {
  if (_.isEmpty(email))
    throw new ApolloError('Email is required!', StatusCodes.BAD_REQUEST);

  if (!isValid(email))
    throw new ApolloError('Invalid email!', StatusCodes.BAD_REQUEST);

  if (_.isEmpty(name))
    throw new ApolloError('Name is required!', StatusCodes.BAD_REQUEST);

  if (_.isEmpty(password))
    throw new ApolloError('Password is required!', StatusCodes.BAD_REQUEST);

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    throw new ApolloError('User already exists!', StatusCodes.BAD_REQUEST);
  }

  const user = new User({ email, name, password });
  return user
    .save()
    .catch((err) => new ApolloError(err, StatusCodes.BAD_REQUEST));
};

export { post, signup };
