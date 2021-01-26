import { post, signup } from './mutation';
import { feed, linkById } from './query';

const resolvers = {
  Query: {
    feed,
    linkById,
  },
  Mutation: {
    post,
    signup,
  },
};

export { resolvers };
