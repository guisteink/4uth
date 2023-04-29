/* global it describe beforeAll afterAll expect */
const request = require("supertest");

const app = require("../../app");
const User = require("../../src/models/user");

describe("POST /signin", () => {
  beforeAll(async () => {
    const newUserTest = await new User({
      email: "test@example.com",
      username: "testuser",
    });
    newUserTest.setPassword("testpassword");
    await newUserTest.save();
  });

  afterAll(async () => {
    await User.deleteOne({ email: "test@example.com" });
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