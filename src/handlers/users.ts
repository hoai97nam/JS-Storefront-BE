import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";
import jwt from 'jsonwebtoken';
import verifyAuthToken from "../utilities/auth";

const userRoutes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/{:id}", show);
  app.post("/users", create);
  app.delete("/users",verifyAuthToken,  destroy);
  app.post("/users/authenticate",verifyAuthToken,  authenticate);
};

const store = new UserStore();
const TOKEN_SECRET = process.env.TOKEN_SECRET;

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (_req: Request, res: Response) => {
  const user = await store.show(_req.body.id);
  res.json(user);
};

const create = async (_req: Request, res: Response) => {
  const user: User = {
    username: _req.body.username,
    password: _req.body.password,
  };
  try {
    const newUser = await store.create(user);
    console.log(newUser)
    var token = jwt.sign({ user: newUser }, TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(`${err} + user`);
  }
};

const destroy = async (_req: Request, res: Response) => {
  const deleted = await store.delete(_req.body.id);
  res.json(deleted);
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
