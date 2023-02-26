"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
const passport_1 = __importDefault(require("passport"));
const unauthenticated_error_1 = require("../errors/unauthenticated-error");
const currentUser = (req, res, next) => {
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
exports.currentUser = currentUser;
const jwtAuthentication = (req, res, next) => {
    passport_1.default.authenticate("jwt", { session: false }, (err, currentUser) => {
        if (!currentUser)
            return next(new unauthenticated_error_1.UnAuthenticatedError);
        next();
    })(req, res, next);
};
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
//# sourceMappingURL=current-user.js.map