import { Resolvers } from "../../types";
import { protectedResolvers } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    toggleFollow: protectedResolvers(
      async (_, { username }, { loggedInUser, client }) => {
        const ok = await client.user.findUnique({ where: { username } });
        if (!ok) {
          return {
            ok: false,
            error: "This user does not exist.",
          };
        }

        if (username === loggedInUser.username) {
          return {
            ok: false,
            error: "You can't follow / unfollow yourself",
          };
        }

        const alreadyFollow = await client.user.findFirst({
          where: {
            username,
            followers: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
        });
        if (alreadyFollow) {
          // unfollow
          await client.user.update({
            where: {
              id: loggedInUser.id,
            },
            data: {
              following: {
                disconnect: {
                  username,
                },
              },
            },
          });
          return {
            ok: true,
          };
        } else {
          // follow
          await client.user.update({
            where: {
              id: loggedInUser.id,
            },
            data: {
              following: {
                connect: {
                  username,
                },
              },
            },
          });
          return {
            ok: true,
          };
        }
      }
    ),
  },
};

export default resolvers;
