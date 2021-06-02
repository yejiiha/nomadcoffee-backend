import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeCoffeeShops: (_, { offset }, { client }) =>
      client.coffeeShop.findMany({
        take: 5,
        skip: offset,
        include: { photos: true },
      }),
  },
};

export default resolvers;
