import { Resolvers } from "../../types";
import { protectedResolvers } from "../../users/users.utils";
import { processCategories } from "../coffeeShop.utils";
import { uploadDataToS3 } from "../../shared/shared.utils";

const resolvers: Resolvers = {
  Mutation: {
    createCoffeeShop: protectedResolvers(
      async (
        _,
        { name, latitude, longitude, categories, photos },
        { client, loggedInUser }
      ) => {
        try {
          const existingShop = await client.coffeeShop.findFirst({
            where: { name },
          });

          if (existingShop) {
            throw new Error("This coffeeShop is already taken.");
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

          const shop = await client.coffeeShop.create({
            data: {
              name,
              latitude,
              longitude,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },

              ...(categoryObj.length > 0 && {
                categories: {
                  connectOrCreate: categoryObj,
                },
              }),
            },
          });

          await client.coffeeShopPhoto.create({
            data: {
              url: photoUrl,
              shop: {
                connect: {
                  id: shop.id,
                },
              },
            },
          });

          return {
            ok: true,
          };
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
