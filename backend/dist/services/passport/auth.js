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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const config_1 = require("../config");
const { Strategy: JWTStrategy, ExtractJwt } = passport_jwt_1.default;
const prisma = new client_1.PrismaClient();
// Local Sign Up Passport middleware handler function
passport_1.default.use(config_1.passportSignUpKey, new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
}, (req, email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user_ = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
    };
    try {
        const prismaUser = yield prisma.user.create({
            data: Object.assign({}, user_),
        });
        console.log("Passport SignUp middleware", "User created successfully");
        yield prisma.$disconnect();
        if (!prismaUser)
            done({ message: "Error: User not found" }, false, { message: "User not found options" });
        return done(null, prismaUser);
    }
    catch (error) {
        yield prisma.$disconnect();
        console.log("Passport SignUp middleware", "Error passport when creating user");
        console.log(error);
        return done(error);
    }
})));
// Local SignIn Passport middleware handler function
passport_1.default.use(config_1.passportSignInKey, new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password",
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("Passport authenticate SignIn Strategy Middleware Handler : Email", email);
        // Retrieve the user from the database where email equal to the email as parameter
        const user = yield prisma.user.findUnique({
            where: { email },
        });
        // Check if the user is found in the database
        if (!user) {
            console.log("Passport authenticate SignIn Strategy Middleware Handler : User not found");
            return done({ message: "Error: User not found" }, false, {
                message: "Options: User not found",
            });
        }
        // Compare password
        const validate = yield bcrypt_1.default.compare(password, user.password);
        if (!validate) {
            console.log("Passport authenticate SignIn Strategy Middleware Handler : Invalide password");
            return done({ message: "Invalid LogIn credentials" }, false, {
                message: "Invalid LogIn credentials",
            });
        }
        console.log("Passport authenticate SignIn Strategy Middleware Handler : LogIn successfull");
        yield prisma.$disconnect();
        return done(null, user, { message: "LogIn successful" });
    }
    catch (error) {
        console.log("Passport authenticate SignIn Strategy Middleware Handler", "Error passport when log user in");
        yield prisma.$disconnect();
        return done(error);
    }
})));
// Passport JWT middleware handler function to secure the routes
passport_1.default.use(new JWTStrategy({
    secretOrKey: config_1.passportSecretKey,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    passReqToCallback: true,
}, (req, token, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Passport jwt middleware Token :", token);
    // return done(null, token);
    const prisma = new client_1.PrismaClient();
    try {
        const { email } = token;
        const prismaUser = yield prisma.user.findUnique({
            where: { email },
            include: {
                tasks: true,
            },
        });
        if (prismaUser) {
            req.currentUser = Object.assign({}, prismaUser);
        }
        else
            req.currentUser = null;
        console.log("Current user : ", req.currentUser);
        // console.log("Tasks : ", req.currentUser?.tasks);
        yield prisma.$disconnect();
        return done(null, req.currentUser);
    }
    catch (error) {
        yield prisma.$disconnect();
        console.log("======= Current User Error Exception =========");
        return done(error, false);
    }
})));
exports.default = passport_1.default;
//# sourceMappingURL=auth.js.map