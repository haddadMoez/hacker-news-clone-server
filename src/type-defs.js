import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    info: String!
  }

  type Mutation {
    post(url: String!, description: String!): Link!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  scalar DateTime
`;
