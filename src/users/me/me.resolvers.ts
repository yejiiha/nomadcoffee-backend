import { Resolvers } from "../../types";
import { protectedResolvers } from "../users.utils";

const resolvers: Resolvers = {
  Query: {
    me: protectedResolvers(
      async (_, __, { loggedInUser, client }) =>
        await client.user.findUnique({
          where: {
            id: loggedInUser.id,
          },
        })
    ),
  },
};

export default resolvers;
