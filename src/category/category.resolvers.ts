import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Category: {
    totalShops: ({ id }, _, { client }) =>
      client.category.count({
        where: {
          shops: {
            some: {
              id,
            },
          },
        },
      }),
  },
};

export default resolvers;
