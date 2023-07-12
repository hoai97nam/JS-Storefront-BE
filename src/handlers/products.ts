import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/products";
import verifyAuthToken from "../utilities/auth";

const store = new ProductStore();

const productRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", verifyAuthToken , create);
  app.delete("/products", destroy);
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
  const order: Product = {
    name: _req.body.name,
    price: _req.body.price,
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

export default productRoutes;
