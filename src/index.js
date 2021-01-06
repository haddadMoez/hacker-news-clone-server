const { ApolloServer } = require('apollo-server');

// Definition of the GraphQL schema
const typeDefs = `
  type Query {
    info: String!
  }
`;

// Implementation of the GraphQL schema
const resolvers = {
  Query: {
    info: () => `This is the API of an example of GraphQL server`,
  },
};

// the schema and resolvers are bundled and passed to ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
