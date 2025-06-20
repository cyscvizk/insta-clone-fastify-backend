import Fastify from "fastify";
import { postsRoutes } from "./posts.routes";

describe("POST /posts", () => {
  it("should create a new post and return it with a 201 status code", async () => {
    const app = Fastify();

    const newPostPayload = {
      img_url:
        "[http://example.com/new-image.jpg](http://example.com/new-image.jpg)",
      caption: "A brand new post from our test!",
    };

    const newReelPayload = {
      video_url:
        "https://giphy.com/gifs/londontheatre-london-theatre-olivier-awards-2017-l0Iy8GdW2Pg8m9vJ6",
      caption: "A brand new reel from our test!",
    };

    const createdPost = { ...newPostPayload, id: 1 };
    const createdReel = { ...newReelPayload, id: 1 };

    app.decorate("transactions", {
      posts: {
        getById: jest.fn(),
        getAll: jest.fn(),
        create: jest.fn().mockReturnValue(createdPost),
      },
      reels: {
        getById: jest.fn(),
        getAll: jest.fn(),
        create: jest.fn().mockReturnValue(createdReel),
      },
    });

    app.register(postsRoutes);

    const response = await app.inject({
      method: "POST",
      url: "/posts",
      payload: newPostPayload,
    });

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.payload)).toEqual(createdPost);
  });

  it("should get all posts and return them with a 200 status code", async () => {
    const app = Fastify();

    const posts = [
      {
        id: 1,
        img_url: "http://example.com/new-image.jpg",
        caption: "A brand new post from our test!",
      },
      {
        id: 2,
        img_url: "http://example.com/new-image.jpg",
        caption: "Another post from our test!",
      },
    ];

    app.decorate("transactions", {
      posts: {
        getById: jest.fn(),
        getAll: jest.fn().mockReturnValue(posts),
        create: jest.fn(),
      },
      reels: {
        getById: jest.fn(),
        getAll: jest.fn(),
        create: jest.fn(),
      },
    });

    app.register(postsRoutes);

    const response = await app.inject({
      method: "GET",
      url: "/posts",
      payload: posts,
    });

    expect(response.statusCode).toBe(200);
    console.log("response:", response);
    expect(JSON.parse(response.payload)).toEqual(posts);
  });
});
