import supertest from "supertest";
import app from "../../server";
import { UserStore } from "../user";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { Product, ProductStore } from "../products";

const request = supertest(app);
const TOKEN_SECRET = process.env.TOKEN_SECRET;
dotenv.config();
const sample = { username: "namnh123", password: "123" };
const productStore = new ProductStore();
const store = new UserStore();

let token: string;

describe("Test Products Model", () => {
  beforeAll(async () => {
    await store.create(sample);
    const u = await store.authenticate(sample.username, sample.password);
    token = jwt.sign({ user: u }, TOKEN_SECRET as string);
  });
  it("Get all products", async () => {
    const response = await request
      .get("/products")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBeTruthy();
  });
  describe("Get products with specific id", async () => {
    let data: Product[];
    beforeEach(async () => {
      await productStore.create({ name: "mug", price: "100" });
      data = await productStore.index();
    });
    it("Test show product endpoint", async () => {
      const response = await request
        .get(`/products/${data[data.length - 1]?.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBeTruthy();
    });
  });
  it("Add products", async () => {
    const response = await request
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "mug", price: "100" });
    expect(response.status).toBeTruthy();
  });
  describe("Delete products with specific id pass from http body", async () => {
    let data: Product[];
    beforeEach(async () => {
      await productStore.create({ name: "mug", price: "100" });
      data = await productStore.index();
    });
    it("Test delete product endpoint", async () => {
      const response = await request
        .delete("/products")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });
});
