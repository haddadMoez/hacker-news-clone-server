import { shield } from 'graphql-shield';
import isAuthenticated from './rules';

export default shield({
  Mutation: {
    post: isAuthenticated,
  },
});
