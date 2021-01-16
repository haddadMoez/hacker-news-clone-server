const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const logger = require('pino')();
require('dotenv').config();
const fs = require('fs');
const path = require('path');
require('./utils/db');

const app = express();

let links = [
  {
    id: 'link-0',
    url: 'www.google.com',
    description: 'HelloWorld!',
  },
];
let idCount = links.length;

// Implementation of the resolvers
const resolvers = {
  Query: {
    info: () => `This is the API of an example of GraphQL server`,
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
  },
};

// the schema and resolvers are bundled and passed to ApolloServer
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
  resolvers,
});

server.applyMiddleware({ app });

app.use((req, res) => {
  res.status(200);
  res.send('Hello!');
  res.end();
});

app.listen({port: PORT}, () => console.log(`🚀 Server ready at http://${HOST}:${PORT}${server.graphqlPath}`));
