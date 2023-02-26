"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTask = exports.getTasks = exports.createTask = void 0;
const client_1 = require("@prisma/client");
const forbidden_error_1 = require("../errors/forbidden-error");
const not_found_error_1 = require("../errors/not-found-error");
const unprocessable_error_1 = require("../errors/unprocessable-error");
const prisma = new client_1.PrismaClient();
const createTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    data.userId = req.currentUser.id;
    try {
        const taskCreated = yield prisma.task.create({
            data,
            /*select: {
                          userId: true,
                      }*/
        });
        yield prisma.$disconnect();
        if (taskCreated) {
            console.log(taskCreated);
            return res.status(201).json(taskCreated);
        }
        return next(new unprocessable_error_1.UnprocessableError("Task", "Create"));
    }
    catch (error) {
        yield prisma.$disconnect();
        console.log(error);
        return next(error);
    }
    next(new forbidden_error_1.NotAuthorizedError());
});
exports.createTask = createTask;
const getTasks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.currentUser.id;
    try {
        const tasks = yield prisma.task.findMany({
            where: { userId },
            orderBy: [{ createdAt: "desc" }],
            // select: { userId: false }
        });
        yield prisma.$disconnect();
        return res.status(200).json(tasks);
    }
    catch (error) {
        yield prisma.$disconnect();
        console.log(error);
        next(error);
    }
});
exports.getTasks = getTasks;
const getTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.taskId;
    try {
        const task = yield prisma.task.findUnique({
            where: { id },
        });
        yield prisma.$disconnect();
        // If the task is found in the database
        if (task) {
            return res.json(Object.assign({}, task));
        }
        next(new not_found_error_1.NotFoundError("Task"));
    }
    catch (error) {
        yield prisma.$disconnect();
        console.log(error);
        next(error);
    }
});
exports.getTask = getTask;
const updateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.taskId;
    const data = req.body;
    delete data.id;
    delete data.userId;
    // console.log("Task to update :", data);
    try {
        const taskUpdated = yield prisma.task.update({
            data,
            where: { id },
        });
        yield prisma.$disconnect();
        if (taskUpdated) {
            return res.status(200).json(taskUpdated);
        }
        next(new unprocessable_error_1.UnprocessableError("Task", "Update"));
    }
    catch (error) {
        yield prisma.$disconnect();
        // if( error instanceof PrismaClientKnownRequestError){
        //     console.log(error.meta);
        //     next(new NotFoundError("Task"));
        // }
        next(error);
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.taskId;
    try {
        const taskDeleted = yield prisma.task.delete({
            where: { id },
        });
        yield prisma.$disconnect();
        if (!taskDeleted)
            return next(new not_found_error_1.NotFoundError("Task"));
        return res.status(200).json({
            status: "success",
            message: "Task deleted successfully",
        });
    }
    catch (error) {
        console.log(error);
        yield prisma.$disconnect();
        next(error);
    }
});
exports.deleteTask = deleteTask;
//# sourceMappingURL=taskController.js.map