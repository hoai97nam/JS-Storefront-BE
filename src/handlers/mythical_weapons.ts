import express, { Request, Response } from "express";
import { MythicalWeaponsStore, Weapon } from "../models/mythical_weapons";
import jwt from "jsonwebtoken";

const store = new MythicalWeaponsStore();

const index = async (req: Request, res: Response) => {
  const weapons = await store.index();
  res.send(weapons);
};
const show = async (req: Request, res: Response) => {
  const weapons = await store.show(req.params.id);
  res.send(weapons);
};
const create = async (req: Request, res: Response) => {
  const weapon: Weapon = {
    name: req.body.name,
    type: req.body.type,
  };
//   try {
//     jwt.verify(req.body.token, process.env.TOKEN_SECRET as string);
//   } catch (error) {
//     res.status(401);
//     res.json(`Invalid token`);
//     return;
//   }
  try {
    const weapons = await store.create(weapon);
    res.send(weapons);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const destroy = async (req: Request, res: Response) => {
  const weapons = await store.delete(req.body.id);
  res.send(weapons);
};

const mythical_weapons_routes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", create);
  app.delete("/products/:id", destroy);
};

export default mythical_weapons_routes;
