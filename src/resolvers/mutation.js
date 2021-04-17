import { ApolloError, AuthenticationError } from 'apollo-server';
import _ from 'lodash';

import { Link } from '../models/link';
import { User } from '../models/user';
import { isValid } from '../utils/validators/mail';
import { isValid as isValidLink } from '../utils/validators/link';
import { NEW_LINK } from '../constants';

const post = async (parent, { description, url }, { user, pubsub }) => {
  if (_.isEmpty(url)) throw new ApolloError('Url is required!');

  if (!isValidLink(url)) throw new ApolloError('Invalid url!');

  const link = new Link({
    description,
    url,
    votes: [],
    postedBy: user._id,
  });

  let newLink = await link.save()
  .then(res => res.populate('postedBy').execPopulate())
  .catch((err) => new ApolloError(err));

  pubsub.publish(NEW_LINK, newLink);
  return newLink;
};

const signup = async (parent, { email, name, password }) => {
  if (_.isEmpty(email)) throw new ApolloError('Email is required!');

  if (!isValid(email)) throw new ApolloError('Invalid email!');

  if (_.isEmpty(name)) throw new ApolloError('Name is required!');

  if (_.isEmpty(password)) throw new ApolloError('Password is required!');

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    throw new ApolloError('User already exists!');
  }

  const user = new User({ email, name, password });
  return user.save().catch((err) => new ApolloError(err));
};

const signin = async (parent, { email, password }) => {
  if (_.isEmpty(email)) throw new ApolloError('Email is required!');

  if (!isValid(email)) throw new ApolloError('Invalid email!');

  if (_.isEmpty(password)) throw new ApolloError('Password is required!');

  const user = await User.findOne({ email }).catch(
    (err) => new ApolloError(err)
  );

  if (!user) throw new AuthenticationError('Invalid email or password!');

  if (!user.comparePassword(password))
    throw new AuthenticationError('Invalid email or password!');
  return { token: await user.createAccessToken(), user };
};

const vote = async (parent, { linkId }, { user }) => {
  const link = await Link.findOneAndUpdate(
    {
      _id: linkId,
    },
    {
      $addToSet: { votes: user._id },
    },
    { new: true }
  );

  if (_.isEmpty(link)) throw new ApolloError('Link does not exist');

  return { link: link._id, user: user._id };
};

export { post, signup, signin, vote };
