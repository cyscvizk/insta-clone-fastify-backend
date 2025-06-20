import type { FastifyInstance } from "fastify";

// Define a type for the data needed to create a post
type CreateReelData = {
  video_url: string;
  caption: string;
};

export const reelsService = (fastify: FastifyInstance) => {
  return {
    create: async (reelData: CreateReelData) => {
      fastify.log.info(`Creating a new reel`);
      // This will use the MOCK `transactions` in our test,
      // and the REAL `transactions` in our live application.
      const post = fastify.transactions.reels.create(reelData);
      return post;
    },
    getAll: async () => {
      fastify.log.info(`Fetching reels`);
      const reels = fastify.transactions.reels.getAll();
      return reels;
    },
  };
};
