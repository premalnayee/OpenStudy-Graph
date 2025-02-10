// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export interface AuthPayload {
  id: string;
  username: string;
  role: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next(); // Proceed without user info; resolvers can check ctx.user if needed.
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;
    req.user = payload;
  } catch (err) {
    console.error("JWT verification failed:", err);
  }
  next();
};
