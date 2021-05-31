import { Resolvers } from "../types";

const resolvers: Resolvers = {
  User: {
    followers: async ({ username }, { offset }, { client }) =>
      await client.user.findUnique({ where: { username } }).followers({
        take: 5,
        skip: offset,
      }),
    following: async ({ username }, { offset }, { client }) =>
      await client.user.findUnique({ where: { username } }).following({
        take: 5,
        skip: offset,
      }),
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser, client }) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(exists);
    },
  },
};

export default resolvers;
