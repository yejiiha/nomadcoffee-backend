import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String!
    location: String!
    password: String!
    avatarUrl: String
    githubUsername: String
    following(offset: Int!): [User]
    followers(offset: Int!): [User]
    isMe: Boolean!
    isFollowing: Boolean!
  }
`;
