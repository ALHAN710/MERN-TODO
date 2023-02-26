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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUser = exports.getUsers = exports.signInUser = exports.registerUser = void 0;
const client_1 = require("@prisma/client");
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../services/config");
const unprocessable_error_1 = require("../errors/unprocessable-error");
const not_found_error_1 = require("../errors/not-found-error");
const runtime_1 = require("@prisma/client/runtime");
const unauthenticated_error_1 = require("../errors/unauthenticated-error");
// import passport from "../services/passport/auth";
const prisma = new client_1.PrismaClient();
const registerUser = (req, res, next) => {
    passport_1.default.authenticate(config_1.passportSignUpKey, { session: false }, (err, prismaUser) => {
        try {
            if (err || !prismaUser) {
                return next(new unprocessable_error_1.UnprocessableError("User"));
            }
            req.login(prismaUser, { session: false }, (error) => __awaiter(void 0, void 0, void 0, function* () {
                if (error)
                    return next(error);
                const body = { id: prismaUser.id, email: prismaUser.email };
                // Generate an user token
                const token = jsonwebtoken_1.default.sign(body, config_1.passportSecretKey, {
                    expiresIn: "1d",
                });
                /*res.cookie("token", token, {
                                httpOnly: true,
                            }*/
                // res.json({ token, user: body });
                return res.status(201).json({ token });
            }));
        }
        catch (error) {
            return next(error);
        }
    })(req, res, next);
};
exports.registerUser = registerUser;
const signInUser = (req, res, next) => {
    passport_1.default.authenticate(config_1.passportSignInKey, (err, prismaUser) => {
        // console.log("object");
        try {
            if (err || !prismaUser) {
                // console.log(err);
                return next(new unauthenticated_error_1.UnAuthenticatedError("Invalid credentials"));
            }
            req.login(prismaUser, { session: false }, (error) => __awaiter(void 0, void 0, void 0, function* () {
                if (error)
                    return next(error);
                const body = { id: prismaUser.id, email: prismaUser.email };
                // Generate an user token
                const token = jsonwebtoken_1.default.sign(body, config_1.passportSecretKey, {
                    expiresIn: "1d",
                });
                /*res.cookie("token", token, {
                                  httpOnly: true,
                              }*/
                // res.json({ token, user: body });
                return res.status(200).json({ token });
            }));
        }
        catch (error) {
            return next(error);
        }
    })(req, res, next);
};
exports.signInUser = signInUser;
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prismaUsers = yield prisma.user.findMany({
            include: { tasks: true },
        });
        yield prisma.$disconnect();
        console.table(prismaUsers);
        let users = [];
        prismaUsers.map((user, _, prismaUsers) => {
            const tasks = user.tasks.map((task) => `/api/tasks/${task.id}`);
            // const index = prismaUsers.findIndex(_user => _user.id === user.id);
            const user_ = Object.assign({}, user);
            delete user_.password;
            users.push(Object.assign(Object.assign({}, user_), { tasks }));
        });
        res.status(200).json(users);
    }
    catch (error) {
        // console.log(error);
        yield prisma.$disconnect();
        next(error);
    }
});
exports.getUsers = getUsers;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.userId;
    try {
        const prismaUser = yield prisma.user.findUnique({
            where: { id },
            // select: { password: false },
            include: { tasks: true },
        });
        yield prisma.$disconnect();
        console.table(prismaUser);
        // let user: (object & { tasks: string[] });
        // If the user is found in the database
        if (prismaUser) {
            const user = Object.assign({}, prismaUser);
            delete user.password;
            // Change the nested relation to Uri
            const tasksUri = prismaUser.tasks.map((task) => {
                return `/api/tasks/${task.id}`;
            });
            return res.json(Object.assign(Object.assign({}, user), { tasks: tasksUri }));
        }
        return next(new not_found_error_1.NotFoundError("User"));
    }
    catch (error) {
        // console.log(error);
        yield prisma.$disconnect();
        next(error);
    }
});
exports.getUser = getUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId: id } = req.params;
    try {
        const updateUser = req.body;
        const { email } = req.body;
        // Delete user id property to avoid id changing id database
        delete updateUser.id;
        console.log(updateUser);
        const user_ = yield prisma.user.update({
            where: { id },
            data: Object.assign({}, updateUser),
            include: { tasks: true },
        });
        yield prisma.$disconnect();
        if (user_) {
            // Change the nested relation to Uri
            const tasksUri = user_.tasks.map((task) => `/api/tasks/${task.id}`);
            const user = Object.assign({}, user_);
            delete user.password;
            const body = { id: user.id, email: user.email };
            // Generate an user token
            const token = jsonwebtoken_1.default.sign(body, config_1.passportSecretKey, {
                expiresIn: "7d",
            });
            return res.json({
                user: Object.assign(Object.assign({}, user), { tasks: tasksUri }),
                token,
            });
        }
        return next(new not_found_error_1.NotFoundError("User"));
    }
    catch (error) {
        yield prisma.$disconnect();
        console.log("======= Update User Error Exception =========");
        if (error instanceof runtime_1.PrismaClientKnownRequestError) {
            console.log(error.meta);
            // throw new NotFoundError("User");
            return next(new not_found_error_1.NotFoundError("User"));
        }
        if (error instanceof not_found_error_1.NotFoundError)
            throw new not_found_error_1.NotFoundError("User");
        throw new Error(error);
    }
});
exports.updateUser = updateUser;
//# sourceMappingURL=userController.js.map