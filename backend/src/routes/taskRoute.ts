import express, { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controllers/taskController";
import { requireAuth } from "../middlewares/require-auth";
import { body, params } from "../middlewares/validate-request";
import { taskSchema } from "../services/validation-schema";

const router = express.Router();

router.post("/api/tasks", requireAuth, body(taskSchema), createTask);

router.get("/api/tasks", requireAuth, getTasks);

router.get("/api/tasks/:taskId", params({ taskId: Joi.string().required() }), requireAuth, getTask);

router.put("/api/tasks/:taskId", params({ taskId: Joi.string().required() }), requireAuth, updateTask);

router.delete("/api/tasks/:taskId", params({ taskId: Joi.string().required() }), requireAuth, deleteTask);




export { router as taskRouter };