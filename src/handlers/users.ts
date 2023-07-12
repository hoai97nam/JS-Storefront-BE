import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";
import jwt from "jsonwebtoken";
import verifyAuthToken from "../utilities/auth";
import * as dotenv from "dotenv";
dotenv.config();

const userRoutes = (app: express.Application) => {
  app.get("/users",verifyAuthToken, index);
  app.get("/users/:id",verifyAuthToken, show);
  app.post("/users", create);
  app.delete("/users/:id", verifyAuthToken, destroy);
  app.post("/users/authenticate", authenticate);
};

const store = new UserStore();
const TOKEN_SECRET = process.env.TOKEN_SECRET;

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    res.status(400);
    res.json(`${error} + user`);
  }
};

const show = async (_req: Request, res: Response) => {
  try {
    const user = await store.show(_req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400);
    res.json(`${error} + user`);
  }
};

const create = async (_req: Request, res: Response) => {
  const user: User = {
    username: _req.body.username,
    password: _req.body.password,
  };
  try {
    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(`${err} + user`);
  }
};

const destroy = async (_req: Request, res: Response) => {
  try {
    const deleted = await store.delete(_req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(400);
    res.json(`${err} + user`);
  }
};

const authenticate = async (_req: Request, res: Response) => {
  const user: User = {
    username: _req.body.username,
    password: _req.body.password,
  };
  try {
    const u = await store.authenticate(user.username, user.password);
    var token = jwt.sign({ user: u }, TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(401);
    res.json(`${err} + user`);
  }
};

export default userRoutes;
