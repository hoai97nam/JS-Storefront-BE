import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
dotenv.config();

const verifyAuthToken = (req: Request, res: Response, next: Function) => {
  try {
    const authorizationHeader = req.headers?.authorization;
    const token = authorizationHeader?.split(" ")[1];
    const decoded = jwt.verify(
      token as string,
      process.env.TOKEN_SECRET as string
    );
    next();
  } catch (error) {
    console.log(`Invalid authorization from header`);
    res.status(401);
  }
};

export default verifyAuthToken;
