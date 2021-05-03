import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    feed(filter: String, skip: Int, limit: Int, sort: LinkOrderByInput): Feed!
    linkById(id: ID!): Link!
  }

  type Mutation {
    post(url: String!, description: String!): Link!
    signup(email: String!, name: String!, password: String!): AuthPayload
    signin(email: String!, password: String!): AuthPayload
    vote(linkId: ID!): Vote!
  }

  type Subscription {
    newLink: Link
    newVote: Vote
  }

  type Feed {
    id: ID!
    links: [Link!]!
    count: Int!
    total: Int!
  }

  type Vote {
    id: ID!
    link: ID!
    user: ID!
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
    postedBy: User
    createdAt: DateTime!
    updatedAt: DateTime!
    votes: [String!]!
  }

  input LinkOrderByInput {
    description: Sort
    url: Sort
    createdAt: Sort
  }

  enum Sort {
    asc
    desc
  }

  scalar DateTime
`;
