import supertest from "supertest";
import app from "../../server";
import { UserStore } from "../user";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { OrderStore } from "../orders";
import { ProductStore } from "../products";

dotenv.config();
const request = supertest(app);
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const sample = { username: "namnh123", password: "123" };
const store = new UserStore();
const orderStore = new OrderStore();
const productStore = new ProductStore();

let token: string;

describe("Test Dashboard Model", () => {
  beforeAll(async () => {
    await store.create(sample);
    const usrs = await store.index();
    await orderStore.create({
      status: "done",
      user_id: '1',
    });
    const u = await store.authenticate(sample.username, sample.password);
    token = jwt.sign({ user: u }, TOKEN_SECRET as string);
    await productStore.create({ name: "mug", price: "100" });
  });
  it("Get products-in-orders", async () => {
    const response = await request
      .get("/products-in-orders")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it("Get users-with-orders", async () => {
    const response = await request
      .get("/users-with-orders")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it("Get five-most-expensive", async () => {
    const response = await request
      .get("/five-most-expensive")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
