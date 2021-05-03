import { ApolloServer, makeExecutableSchema, PubSub } from 'apollo-server';
import { applyMiddleware } from 'graphql-middleware';
import _ from 'lodash';

import db from './utils/database';
import permissions from './utils/auth/permissions';
import { typeDefs } from './schemas';
import { resolvers } from './resolvers';
import { User } from './models/user';

db.connect();

const pubsub = new PubSub();

const server = new ApolloServer({
  schema: applyMiddleware(
    makeExecutableSchema({ typeDefs, resolvers }),
    permissions
  ),
  context: async ({ req }) => {
    const user = await User.findByAccessToken(
      _.get(req, 'headers.authorization', null)
    );
    return { ...req, pubsub, user };
  },
});

server
  .listen()
  .then(({ url }) => console.log(`🚀 Server is running on ${url}`));
