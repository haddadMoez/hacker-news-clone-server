import { ApolloServer } from 'apollo-server';
import db from './utils/db';
import { PORT, HOST } from './constants';
import { typeDefs } from './schemas';
import { resolvers } from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

db.connect();

server.listen().then(({ url }) => console.log(`🚀 Server is running on ${url}`));