import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeCategories: (_, { offset }, { client }) =>
      client.category.findMany({
        take: 5,
        skip: offset,
      }),
  },
};

export default resolvers;
