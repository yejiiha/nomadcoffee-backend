import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchCoffeeShops: async (_, { keyword }, { client }) =>
      client.coffeeShop.findMany({
        where: {
          name: {
            contains: keyword.toLowerCase(),
          },
        },
      }),
  },
};

export default resolvers;
