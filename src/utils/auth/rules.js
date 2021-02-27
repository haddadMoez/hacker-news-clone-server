import { rule } from 'graphql-shield';

export default rule()(
  async (parent, args, { user }, info) => !!user
);