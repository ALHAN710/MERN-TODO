import { PrismaClient, Task, User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import {
  passportSecretKey,
  passportSignInKey,
  passportSignUpKey,
} from "../services/config";
import { UnprocessableError } from "../errors/unprocessable-error";
import { NotFoundError } from "../errors/not-found-error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { UnAuthenticatedError } from "../errors/unauthenticated-error";
// import passport from "../services/passport/auth";
const prisma = new PrismaClient();

export const registerUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    passportSignUpKey,
    { session: false },
    (err, prismaUser: User) => {
      try {
        if (err || !prismaUser) {
          return next(new UnprocessableError("User"));
        }

        req.login(prismaUser, { session: false }, async (error) => {
          if (error) return next(error);

          const body = { id: prismaUser.id, email: prismaUser.email };

          // Generate an user token
          const token = jwt.sign(body, passportSecretKey, {
            expiresIn: "1d",
          });

          /*res.cookie("token", token, {
                          httpOnly: true,
                      }*/

          // res.json({ token, user: body });
          return res.status(201).json({ token });
        });
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
};

export const signInUser = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(passportSignInKey, (err, prismaUser: User) => {
    // console.log("object");
    try {
      if (err || !prismaUser) {
        // console.log(err);
        return next(new UnAuthenticatedError("Invalid credentials"));
      }

      req.login(prismaUser, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { id: prismaUser.id, email: prismaUser.email };

        // Generate an user token
        const token = jwt.sign(body, passportSecretKey, {
          expiresIn: "1d",
        });

        /*res.cookie("token", token, {
                          httpOnly: true,
                      }*/

        // res.json({ token, user: body });
        return res.status(200).json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prismaUsers = await prisma.user.findMany({
      include: { tasks: true },
    });
    await prisma.$disconnect();
    console.table(prismaUsers);

    let users: (object & { tasks: string[] })[] = [];
    prismaUsers.map((user, _, prismaUsers) => {
      const tasks = user.tasks.map((task) => `/api/tasks/${task.id}`);
      // const index = prismaUsers.findIndex(_user => _user.id === user.id);
      const user_ = { ...user } as Partial<User>;

      delete user_.password;

      users.push({ ...user_, tasks });
    });

    res.status(200).json(users);
  } catch (error) {
    // console.log(error);
    await prisma.$disconnect();
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.userId;

  try {
    const prismaUser:
      | (User & {
          tasks: Task[];
        })
      | null = await prisma.user.findUnique({
      where: { id },
      // select: { password: false },
      include: { tasks: true },
    });
    await prisma.$disconnect();
    console.table(prismaUser);

    // let user: (object & { tasks: string[] });

    // If the user is found in the database
    if (prismaUser) {
      const user: any = { ...prismaUser };
      delete user.password;
      // Change the nested relation to Uri
      const tasksUri = prismaUser.tasks.map((task) => {
        return `/api/tasks/${task.id}`;
      });

      return res.json({
        ...user,
        tasks: tasksUri,
      });
    }

    return next(new NotFoundError("User"));
  } catch (error) {
    // console.log(error);
    await prisma.$disconnect();
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId: id } = req.params;

  try {
    const updateUser = req.body;
    const { email } = req.body;

    // Delete user id property to avoid id changing id database
    delete updateUser.id;
    console.log(updateUser);
    const user_ = await prisma.user.update({
      where: { id },
      data: { ...updateUser },
      include: { tasks: true },
    });

    await prisma.$disconnect();

    if (user_) {
      // Change the nested relation to Uri
      const tasksUri = user_.tasks.map((task) => `/api/tasks/${task.id}`);
      const user: Partial<User> = { ...user_ };
      delete user.password;

      const body = { id: user.id, email: user.email };

      // Generate an user token
      const token = jwt.sign(body, passportSecretKey, {
        expiresIn: "7d",
      });

      return res.json({
        user: {
          ...user,
          tasks: tasksUri,
        },
        token,
      });
    }

    return next(new NotFoundError("User"));
  } catch (error: any) {
    await prisma.$disconnect();
    console.log("======= Update User Error Exception =========");
    if (error instanceof PrismaClientKnownRequestError) {
      console.log(error.meta);
      // throw new NotFoundError("User");
      return next(new NotFoundError("User"));
    }

    if (error instanceof NotFoundError) throw new NotFoundError("User");
    throw new Error(error);
  }
};
