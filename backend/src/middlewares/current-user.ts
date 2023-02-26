import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { UnAuthenticatedError } from "../errors/unauthenticated-error";

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization) {
    console.log("Current user Middleware");
    // passport.authenticate("jwt", { session: false })(req, res, next);
    return jwtAuthentication(req, res, next);
    // console.log("After Passport Jwt authenticating strategy");
    // return next();
  }
  console.log("No Authorization Header");
  return next();
};

const jwtAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("jwt", { session: false }, (err, currentUser) => {
    if(!currentUser) return next(new UnAuthenticatedError);

    next();
  })(req, res, next);
}

/*, async (err, token) => {
  if(err) return next(err);
  const prisma = new PrismaClient();
  try {
    const { email } = token;

    const prismaUser = await prisma.user.findUnique({
      where: { email },
      include: {
        tasks: true,
      },
    });

    await prisma.$disconnect();

    if (prismaUser) {
      req.currentUser = { ...prismaUser };
    } else req.currentUser = null;

    console.log("Current user : ", req.currentUser);
    // console.log("Customers : ", req.currentUser?.customers);
    // console.log("Invoices : ", req.currentUser?.customers);
  } catch (error: any) {
    await prisma.$disconnect();

    console.log("======= Current User Error Exception =========");

    next(error);
  }
}*/