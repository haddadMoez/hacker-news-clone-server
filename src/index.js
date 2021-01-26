import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import db from './utils/db';
import { PORT, HOST } from './constants';
import { typeDefs } from './schemas';
import { resolvers } from './resolvers';

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

db.connect();

app.use((req, res) => {
  res.status(200);
  res.send('Hello World!');
  res.end();
});

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://${HOST}:${PORT}${server.graphqlPath}`)
);
