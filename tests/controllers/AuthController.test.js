/* global it describe beforeAll afterAll expect */
const request = require("supertest");

const server = require("../../app");
const User = require("../../src/models/user");
const { disconnectToMongodb } = require("../../src/configs/database");

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
    await server.close();
    await disconnectToMongodb();
  });

  it("retorna um token de autenticação válido para um usuário existente", async () => {
    const response = await request(server)
      .post("/api/signin")
      .send({ email: "test@example.com", password: "testpassword" })
      .expect(200);

    expect(response.body).toHaveProperty("token");
  });

  it("retorna um erro 422 se o e-mail ou o nome de usuário estiver vazio", async () => {
    const response = await request(server)
      .post("/api/signin")
      .send({ password: "testpassword" })
      .expect(422);

    expect(response.body.errors).toHaveProperty("email", "can't be empty");
  });

  it("retorna um erro 422 se a senha estiver vazia", async () => {
    const response = await request(server)
      .post("/api/signin")
      .send({ email: "test@example.com" })
      .expect(422);

    expect(response.body.errors).toHaveProperty("password", "can't be empty");
  });

  it("retorna um erro 422 se as credenciais estiverem incorretas", async () => {
    const response = await request(server)
      .post("/api/signin")
      .send({ email: "test@example.com", password: "wrongpassword" })
      .expect(422);

    expect(response.body).toEqual({
      errors: { message: "invalid credentials" },
    });
  });
});

describe("POST /signup", () => {
  beforeAll(async () => {
    const newUserTest = await new User({
      email: "john@example.com",
      username: "john",
    });
    newUserTest.setPassword("testpassword");
    await newUserTest.save();
  });

  afterAll(async () => {
    await User.deleteMany({
      email: { $in: ["test@example.com", "john@example.com"] },
    });
    await server.close();
    await disconnectToMongodb();
  });

  it("retorna um token de autenticação válido e cria um usuário", async () => {
    const response = await request(server)
      .post("/api/signup")
      .send({ username: "test", email: "test@example.com", password: "test" })
      .expect(200);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("deve retornar um erro 422 se o usuário já existir", async () => {
    const response = await request(server)
      .post("/api/signup")
      .send({
        username: "john",
        email: "john@example.com",
        password: "123456",
      })
      .expect(422);

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty("error", "User already exists");
  });
});
