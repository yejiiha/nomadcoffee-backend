import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createAccount(
      username: String!
      email: String!
      name: String!
      location: String!
      password: String!
      avatarUrl: String
      githubUsername: String
    ): MutationResponse!
  }
`;
