const { ApolloServer } = require('apollo-server');

// Definition of the GraphQL schema
const typeDefs = `
  type Query {
    info: String!
    feed: [Link!]!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`;

let links = [
  {
    id: 'link-0',
    url: 'www.google.com',
    description: 'HelloWorld!',
  },
];

// Implementation of the GraphQL schema
const resolvers = {
  Query: {
    info: () => `This is the API of an example of GraphQL server`,
    feed: () => links,
  },
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  },
};

// the schema and resolvers are bundled and passed to ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
