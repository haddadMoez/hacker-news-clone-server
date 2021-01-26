import { Link } from '../models/link';
import { ApolloError } from 'apollo-server';
import { StatusCodes } from 'http-status-codes';

const post = async (_, { description, url }) => {
  const link = new Link({ description, url });

  return await link
    .save()
    .catch((err) => new ApolloError(err, StatusCodes.BAD_REQUEST));
};

export { post };
