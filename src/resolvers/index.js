import { post, signup, signin, vote } from './mutation';
import { feed, linkById } from './query';
import { newLink, newVote } from './subscription';

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
  Subscription: {
    newLink,
    newVote
  },
};

export { resolvers };
