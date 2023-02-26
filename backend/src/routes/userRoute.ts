import express, { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { getUser, getUsers, registerUser, signInUser, updateUser } from "../controllers/userController";
import { userSecurity } from "../middlewares/access-control";
import { requireAuth } from "../middlewares/require-auth";
import { body, params } from "../middlewares/validate-request";
import { accountSchema, loginSchema, registerSchema } from "../services/validation-schema";

const router = express.Router();

router.post(
  "/api/users/signup",
  // body(registerSchema),
  registerUser
);

router.post(
  "/api/users/signin",
  body(loginSchema),
  signInUser
);

router.get("/api/users", getUsers);

router.get(
  "/api/users/:userId",
  params({ userId: Joi.string() }),
  requireAuth,
  userSecurity,
  getUser
);

router.put(
  "/api/users/account/:userId",
  requireAuth,
  params({ userId: Joi.string() }),
  // params({ userId: Joi.string().uuid() }),
  // security(
  //   // isGranted(userRoles.USER),
  //   userSecurity
  // ),
  body(accountSchema),
  updateUser
);

export { router as userRouter };
