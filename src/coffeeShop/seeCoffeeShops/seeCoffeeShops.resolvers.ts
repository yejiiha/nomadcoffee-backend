import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeCoffeeShops: (_, { offset }, { client, loggedInUser }) =>
      client.coffeeShop.findMany({
        take: 5,
        skip: offset,
        include: { photos: true, user: true, categories: true },
        where: {
          OR: [
            {
              user: {
                followers: {
                  some: {
                    id: loggedInUser.id,
                  },
                },
              },
            },
            {
              userId: loggedInUser.id,
            },
          ],
        },
        orderBy: {
          id: "desc",
        },
      }),
  },
};

export default resolvers;
