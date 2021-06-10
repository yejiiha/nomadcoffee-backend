import { Resolvers } from "../../types";
import { protectedResolvers } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    deleteCoffeeShop: protectedResolvers(
      async (_, { id }, { client, loggedInUser }) => {
        try {
          const shop = await client.coffeeShop.findUnique({
            where: { id },
            include: {
              photos: true,
            },
            rejectOnNotFound: true,
          });

          if (!shop) {
            throw new Error("This coffeeShop is not found.");
          } else if (shop.userId !== loggedInUser.id) {
            throw new Error("Not authorized.");
          } else {
            await client.coffeeShopPhoto.deleteMany({
              where: {
                shop: { id },
              },
            });
            await client.coffeeShop.delete({
              where: {
                id,
              },
            });
            return {
              ok: true,
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
          };
        }
      }
    ),
  },
};

export default resolvers;
