/* global it describe beforeAll afterAll expect */
const request = require("supertest");

const server = require("../../app");
const User = require("../../src/models/user");
const { disconnectToMongodb } = require("../../src/configs/database");

const PORT = process.env.PORT || 3333;

describe("POST /signin", () => {
  beforeAll(async () => {
    const newUserTest = await new User({
      email: "test@example.com",
      username: "testuser",
    });
    newUserTest.setPassword("testpassword");
    await newUserTest.save();
  });

  afterAll(async (done) => {
    await User.deleteOne({ email: "test@example.com" });
    await disconnectToMongodb();
    server.close(done);
  });

  it("retorna um token de autenticação válido para um usuário existente", async () => {
    const response = await request(app)
      .post("/api/signin")
      .send({ email: "test@example.com", password: "testpassword" })
      .expect(200);
    expect(response.body).toHaveProperty("token");
  });

  // it("retorna um erro 422 se o e-mail ou o nome de usuário estiver vazio", async () => {
  //   const response = await request(app)
  //     .post("/signin")
  //     .send({ password: "testpassword" })
  //     .expect(422);

  //   expect(response.body.errors).toHaveProperty("email", "can't be empty");
  // });

  // it("retorna um erro 422 se a senha estiver vazia", async () => {
  //   const response = await request(app)
  //     .post("/signin")
  //     .send({ email: "test@example.com" })
  //     .expect(422);

  //   expect(response.body.errors).toHaveProperty("password", "can't be empty");
  // });

  // it("retorna um erro 422 se as credenciais estiverem incorretas", async () => {
  //   const response = await request(app)
  //     .post("/signin")
  //     .send({ email: "test@example.com", password: "wrongpassword" })
  //     .expect(422);

  //   expect(response.body).toEqual({ errors: { message: "Invalid credentials" } });
  // });
});
