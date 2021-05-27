import * as bcrypt from "bcrypt";
import { Resolvers } from "../../types";
import { protectedResolvers } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolvers(
      async (
        _,
        {
          username,
          email,
          name,
          location,
          password: newPassword,
          avatarUrl,
          githubUsername,
        },
        { loggedInUser, client }
      ) => {
        // Hash new Password
        let uglyPassword = null;
        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }

        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            username,
            email,
            name,
            location,
            ...(uglyPassword && { password: uglyPassword }),
            avatarUrl,
            githubUsername,
          },
        });

        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Cannot update Profile",
          };
        }
      }
    ),
  },
};

export default resolvers;
