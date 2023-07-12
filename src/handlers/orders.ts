import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/orders";
import verifyAuthToken from "../utilities/auth";

const store = new OrderStore();

const orderRoutes = (app: express.Application) => {
  app.get("/orders", verifyAuthToken, index);
  app.get("/orders/:id", verifyAuthToken, show);
  app.post("/orders", verifyAuthToken, create);
  app.delete("/orders", verifyAuthToken, destroy);
  app.post("/orders/:id/products", verifyAuthToken, addProduct);
};

const index = async (_req: Request, res: Response) => {
  try {
    const results = await store.index();
    res.json(results);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const show = async (_req: Request, res: Response) => {
  try {
    const order = await store.show(_req.params.id);
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (_req: Request, res: Response) => {
  const order: Order = {
    status: _req.body.status,
    user_id: _req.body.user_id,
  };
  try {
    await store.create(order);
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json(`${error} + order`);
  }
};
const destroy = async (_req: Request, res: Response) => {
  try {
    const order = await store.delete(_req.body.id);
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.body.order_id;
  const productId: string = _req.body.product_id;
  const quantity: number = parseInt(_req.body.quantity);
  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export default orderRoutes;
