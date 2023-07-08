import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyAuthToken = (req: Request, res: Response, next: Function) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.toString().split(" ")[1];
    const decoded = jwt.verify(
      token as string,
      process.env.TOKEN_SECRET as string
    );

    next();
  } catch (error) {
    res.status(401);
  }
};

export default verifyAuthToken;