import supertest from "supertest";
import { User, UserStore } from "../user";
import app from "../../server";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

const request = supertest(app);
const store = new UserStore();
const TOKEN_SECRET = process.env.TOKEN_SECRET;
dotenv.config();
const sample = { username: "namnh123", password: "123" };

let token: string;

describe("Test User Model", () => {
  beforeEach(async () => {
    await store.create(sample);
    const u = await store.authenticate(sample.username, sample.password);
    token = jwt.sign({ user: u }, TOKEN_SECRET as string);
  });
  it("Get all users", async () => {
    const response = await request
      .get("/users")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  describe("Get/Delete user with specific id", async () => {
    let data: User[];
    beforeEach(async () => {
      data = await store.index();
    });
    it("Test show user endpoint", async () => {
      const response = await request
        .get(`/users/${data[data.length - 1].id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
    it("Delete user with specific id pass from http body", async () => {
      const response = await request
        .delete(`/users/${data[data.length - 1].id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBeTruthy();
    });
  });
  it("Add user", async () => {
    const response = await request.post("/users").send(sample);
    expect(response.status).toBe(200);
  });
  it("Get authentication token of user", async () => {
    const response = await request.post("/users/authenticate").send(sample);
    expect(response.status).toBe(200);
  });
});
