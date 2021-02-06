import { post, signup, signin } from './mutation';
import { feed, linkById } from './query';

const resolvers = {
  Query: {
    feed,
    linkById,
  },
  Mutation: {
    post,
    signup,
    signin,
  },
};

export { resolvers };
