import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeCategory: (_, { id, offset }, { client }) =>
      client.category
        .findFirst({
          where: { id },
        })
        .shops({
          take: 5,
          skip: offset,
        }),
  },
};

export default resolvers;
