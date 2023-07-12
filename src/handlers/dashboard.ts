import express, { Request, Response } from "express";

import { DashboardQueries } from "../services/dashboard";

const dashboard = new DashboardQueries();

const dashboardRoutes = (app: express.Application) => {
  app.get("/products-in-orders", productsInOrders);
  app.get("/users-with-orders", usersWithOrders);
  app.get("/five-most-expensive", fiveMostExpensive);
};

const productsInOrders = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.productsInOrders();
    res.json(products);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const usersWithOrders = async (_req: Request, res: Response) => {
  try {
    const users = await dashboard.usersWithOrders();
    res.json(users);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const fiveMostExpensive = async (_req: Request, res: Response) => {
  try {
    const users = await dashboard.fiveMostExpensive();
    res.json(users);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

export default dashboardRoutes;
