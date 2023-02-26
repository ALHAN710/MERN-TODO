import { NextFunction, Request, Response } from "express";
import { UnAuthenticatedError } from "../errors/unauthenticated-error";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log("Passport user :", req.user);
  if (!req.currentUser) {
    console.log("======== UnAuthenticated ==========");
    // return next(new UnAuthenticatedError());
    throw new UnAuthenticatedError();
    try {
      
    } catch (error) {
      next(error);
    }
  }

  next();
};
