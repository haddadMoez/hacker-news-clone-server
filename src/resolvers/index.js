import { post } from './mutation';
import { feed, linkById } from './query';

const resolvers = {
  Query: {
    feed,
    linkById,
  },
  Mutation: {
    post,
  },
};

export { resolvers };
