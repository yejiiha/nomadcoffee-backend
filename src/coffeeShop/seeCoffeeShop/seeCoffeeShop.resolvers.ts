import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeCoffeeShop: (_, { id }, { client }) =>
      client.coffeeShop.findFirst({
        where: { id },
        include: { categories: true, photos: true, user: true },
      }),
  },
};

export default resolvers;
