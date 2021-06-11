import { uploadDataToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectedResolvers } from "../../users/users.utils";
import { processCategories } from "../coffeeShop.utils";

const resolvers: Resolvers = {
  Mutation: {
    editCoffeeShop: protectedResolvers(
      async (
        _,
        { id, name, latitude, longitude, photos, categories },
        { loggedInUser, client }
      ) => {
        try {
          const oldShop = await client.coffeeShop.findFirst({
            where: { id, userId: loggedInUser.id },
            include: {
              categories: { select: { name: true } },
              photos: { select: { id: true } },
            },
          });

          if (!oldShop) {
            throw new Error("This coffeeShop is not found.");
          }

          let categoryObj = [];
          let photoUrl = "";

          if (categories) {
            categoryObj = processCategories(categories);
          }

          if (photos) {
            photoUrl = await uploadDataToS3(
              photos,
              loggedInUser.id,
              "coffeeShopPhoto"
            );
          }

          const updateShop = await client.coffeeShop.update({
            where: { id },
            data: {
              name,
              latitude,
              longitude,
              ...(categoryObj.length > 0 && {
                categories: {
                  disconnect: oldShop.categories,
                  connectOrCreate: categoryObj,
                },
              }),
              photos: {
                deleteMany: [{ id: oldShop.photos[0].id }],
                connectOrCreate: {
                  where: { id },
                  create: { url: photoUrl },
                },
              },
            },
          });

          if (updateShop.id) {
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
