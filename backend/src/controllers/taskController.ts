import { PrismaClient, Task } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../errors/forbidden-error";
import { NotFoundError } from "../errors/not-found-error";
import { UnprocessableError } from "../errors/unprocessable-error";

const prisma = new PrismaClient();

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data: Task = req.body;
  data.userId = req.currentUser.id;
  try { 
    const taskCreated = await prisma.task.create({
      data,
      /*select: {
                    userId: true,
                }*/
    });
    await prisma.$disconnect();
    if (taskCreated) {
      console.log(taskCreated);
      return res.status(201).json(taskCreated);
    }

    return next(new UnprocessableError("Task", "Create"));
  } catch (error) {
    await prisma.$disconnect();
    console.log(error);
    return next(error);
  }

  next(new NotAuthorizedError());
};

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.currentUser.id;

  try {
    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: [{ createdAt: "desc"}],
      // select: { userId: false }
    });

    await prisma.$disconnect();

    return res.status(200).json(tasks);
  } catch (error) {
    await prisma.$disconnect();
    console.log(error);
    next(error);
  }
};

export const getTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.taskId;

  try {
    const task = await prisma.task.findUnique({
      where: { id },
    });

    await prisma.$disconnect();

    // If the task is found in the database
    if (task) {
      return res.json({
        ...task,
      });
    }

    next(new NotFoundError("Task"));
  } catch (error) {
    await prisma.$disconnect();
    console.log(error);
    next(error);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.taskId;
  const data: Partial<Task> = req.body;
  delete data.id;
  delete data.userId;
  // console.log("Task to update :", data);

  try {
    const taskUpdated = await prisma.task.update({
      data,
      where: { id },
    });

    await prisma.$disconnect();

    if (taskUpdated) {
      return res.status(200).json(taskUpdated);
    }

    next(new UnprocessableError("Task", "Update"));
  } catch (error: any) {
    await prisma.$disconnect();
    // if( error instanceof PrismaClientKnownRequestError){
    //     console.log(error.meta);
    //     next(new NotFoundError("Task"));
    // }
    next(error);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.taskId;
  try {
    const taskDeleted = await prisma.task.delete({
      where: { id },
    });

    await prisma.$disconnect();

    if (!taskDeleted) return next(new NotFoundError("Task"));

    return res.status(200).json({
      status: "success",
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    next(error);
  }
};
