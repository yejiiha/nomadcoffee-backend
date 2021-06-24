import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchCategories: async (_, { keyword }, { client }) =>
      client.category.findMany({
        where: {
          name: {
            contains: keyword.toLowerCase(),
          },
        },
      }),
  },
};

export default resolvers;
