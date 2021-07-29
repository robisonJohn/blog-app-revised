import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import Post from "../models/post.js";
import faker from "faker";

beforeAll(async () => {
  // create a test database url
  // changed from postsTestDatabase to postsTestDatabase refer connection.js
  const MONGODB_TEST_URI = `mongodb://127.0.0.1/postsTestDatabase`;

  // close the existing connection to the database so we can connect to the test database
  await mongoose.connection.close();

  // connect to the test database
  await mongoose.connect(MONGODB_TEST_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  // create an array of 30 objects
  const posts = [...Array(30)].map((item) => {
    return {
      title: faker.lorem.sentence(),
      image_url: faker.internet.url(),
      description: faker.lorem.paragraph(),
    };
  });
  await Post.insertMany(posts);
  console.log("Created posts!");
});

// this variable will be used later in our tests
let postId;

// posts api tests
describe("Test the express routes for posts", () => {
  // test the GET express route for the '/api/posts' path
  it("should show all posts", async () => {
    const res = await request(app).get(`/api/posts`);
    // test that the status code is 200 - successful
    expect(res.statusCode).toEqual(200);
    // test that the response object has an _id property
    expect(res.body[0]).toHaveProperty("_id");
    // Save the _id value for later use with other tests
    postId = res.body[0]._id;
  }),
    it("should show a specific post", async () => {
      // create a GET request with SuperTest using the postId from the previous POST test
      const res = await request(app).get(`/api/posts/${postId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("_id");
    }),
    // test the POST express route for the '/api/posts' path
    it("should create a new post", async () => {
      // create a POST request with SuperTest
      const res = await request(app).post(`/api/posts`).send({
        title: "Test Post",
        image_url: "http://www.testing.com",
        description: "http://www.testing.com"
      });
      // test that the POST request was successful
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("_id");
    }),
    it("should update a post", async () => {
      // create a PUT request with SuperTest using the postId from the POST test
      const res = await request(app).put(`/api/posts/${postId}`).send({
        title: "Update Test Post",
        image_url: "http://www.testing.com",
        description: "http://www.testing.com"
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("_id");
    });
});

afterAll(async () => {
  // after all tests are complete delete the test database
  await mongoose.connection.db.dropDatabase();
  // close the database connection
  await mongoose.connection.close();
});
