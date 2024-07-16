import { config } from "../config/config";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { JwtPayload, verify } from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId: String;
}

export interface CustomJwtPayload extends JwtPayload {
  id: string;
}
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");
  if (!token) {
    return next(createHttpError(401, "Authorization token is required."));
  }

  try {
    const parsedToken = token.split(" ")[1];

    const decoded = verify(
      parsedToken,
      config.SECRET_KEY as string
    ) as CustomJwtPayload;
    const _req = req as AuthRequest;
    _req.userId = decoded.id;
    next();
  } catch (error) {
    return next(createHttpError(401, "Token expired."));
  }
};

export default authenticate;
