import { post, signup, signin, vote } from './mutation';
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
    vote,
  },
};

export { resolvers };
