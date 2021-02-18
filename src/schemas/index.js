import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    feed: Feed!
    linkById(id: ID!): Link!
  }

  type Mutation {
    post(url: String!, description: String!): Link!
    signup(email: String!, name: String!, password: String!): User
    signin(email: String!, password: String!): AuthPayload
  }

  type Feed {
    id: ID!
    links: [Link!]!
    count: Int!
  }

  type AuthPayload {
    token: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
    links: [Link!]!
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
