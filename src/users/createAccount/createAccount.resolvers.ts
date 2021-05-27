import * as bcrypt from "bcrypt";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { username, email, name, location, password, avatarUrl, githubUsername },
      { client }
    ) => {
      try {
        // check if username or email are already on DB
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });

        if (existingUser) {
          throw new Error("This username or email is already taken.");
        }

        // hash password
        const uglyPassword = await bcrypt.hash(password, 10);

        // save and return the user
        await client.user.create({
          data: {
            username,
            email,
            name,
            location,
            password: uglyPassword,
            avatarUrl,
            githubUsername,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message || "Can't create account",
        };
      }
    },
  },
};

export default resolvers;
