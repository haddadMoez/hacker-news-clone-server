import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    feed: Feed!
    linkById(id: ID!): Link!
  }

  type Mutation {
    post(url: String!, description: String!): Link!
    signup(email: String!, name: String!, password: String!): AuthPayload
    signin(email: String!, password: String!): AuthPayload
    vote(linkId: ID!): Vote
  }

  type Vote {
    id: ID!
    link: ID!
    user: ID!
  }

  type Feed {
    id: ID!
    links: [Link!]!
    count: Int!
  }

  type AuthPayload {
    token: String
    user: User
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
    votes: [Vote!]!
  }

  scalar DateTime
`;
