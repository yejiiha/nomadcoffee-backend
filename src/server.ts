require("dotenv").config();
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import { typeDefs, resolvers } from "./schema";
import client from "./client";
import { getUser, protectedResolvers } from "./users/users.utils";
import { String } from "aws-sdk/clients/cloudhsm";

const PORT = process.env.PORT;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  uploads: false,
  context: async ({ req }) => {
    return {
      client,
      loggedInUser: await getUser(req.headers.token as string),
      protectedResolvers,
    };
  },
});

const app = express();
app.use(logger("tiny"));
app.use(graphqlUploadExpress());
server.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  console.log(`✨ Server is running on http://localhost:${PORT}/graphql`);
});
