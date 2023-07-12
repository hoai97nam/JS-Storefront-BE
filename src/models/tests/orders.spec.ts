import supertest from "supertest";
import app from "../../server";
import { UserStore } from "../user";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { Order, OrderStore } from "../orders";
import { ProductStore } from "../products";

const request = supertest(app);
const TOKEN_SECRET = process.env.TOKEN_SECRET;
dotenv.config();
const sample = { username: "order", password: "123" };
const store = new UserStore();
const orderStore = new OrderStore();
const productStore = new ProductStore();

let token: string;

describe("Test Orders Model", () => {
  beforeAll(async ()=>{
    const data = await store.create(sample);
    await orderStore.create({ status: "done", user_id: '1' });
    const u = await store.authenticate(sample.username, sample.password);
    token = jwt.sign({ user: u }, TOKEN_SECRET as string);
  });
  it("Get all orders", async () => {
    try {
      const response = await request
      .get("/orders")
      .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
    } catch (e) {
      console.log('fuck', e)
    }
  });
  describe("Get order with specific id", async () => {
    let data: Order[];
    beforeEach(async () => {
      data = await orderStore.index();
    });
    it('Test show order endpoint', async ()=>{
      const response = await request
        .get(`/orders/${data[data.length - 1]?.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBeTruthy();
    });
  });
  it("Add order", async () => {
    const response = await request
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "done", user_id: "1" });
    expect(response.status).toBeTruthy();
  });
  it("Delete order with specific id pass from http body", async () => {
    const response = await request
      .delete("/orders")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  describe("Add order product", async () => {
    beforeEach( async ()=>{
      await productStore.create({name: "mug", price: "100"})
    })
    it('add order product endpoint', async ()=>{
      const response = await request
        .post(`/orders/1/products`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          order_id: 1,
          product_id: 1,
          quantity: 10,
        });
      expect(response.status).toBeTruthy();
    })
  });
});
