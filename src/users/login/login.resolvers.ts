import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password }, { client }) => {
      try {
        // Find user with args.username
        const user = await client.user.findFirst({ where: { username } });
        if (!user) {
          return {
            ok: false,
            error: "User is not found.",
          };
        }

        // Check password with args.password
        const passwordOk = await bcrypt.compare(
          password,
          (
            await user
          ).password
        );
        if (!passwordOk) {
          return {
            ok: false,
            error: "Incorrect Password",
          };
        }

        // Issue a token and send it to the user
        const token = await jwt.sign(
          { id: (await user).id },
          process.env.SECRET_KEY
        );

        return {
          ok: true,
          token,
        };
      } catch (error) {
        return {
          ok: true,
          error: error.message,
        };
      }
    },
  },
};

export default resolvers;
