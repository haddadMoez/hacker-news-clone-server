import { ApolloServer } from 'apollo-server';
import db from './utils/db';
import { PORT, HOST } from './constants';
import { typeDefs } from './schemas';
import { resolvers } from './resolvers';

db.connect();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(({ url }) => console.log(`🚀 Server is running on ${url}`));
