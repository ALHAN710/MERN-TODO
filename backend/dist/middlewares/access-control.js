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
exports.userRoles = exports.role_hierarchy = exports.taskSecurity = exports.userSecurity = exports.security = void 0;
const client_1 = require("@prisma/client");
const forbidden_error_1 = require("../errors/forbidden-error");
const not_found_error_1 = require("../errors/not-found-error");
const prisma = new client_1.PrismaClient();
const security = (...securityHandlers) => (req, res, next) => securityHandlers.forEach((handler) => handler(req, res, next));
exports.security = security;
/*export const isGranted = (role: userRoles) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("=========== Handler inside isGranted ============");
    const userRoles = req.currentUser?.roles;
    if (userRoles?.includes(role)) return next();
    return next(new NotAuthorizedError());
  };
};*/
const userSecurity = (req, res, next) => {
    var _a;
    console.log("============ User Security Handler =============");
    if (((_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id) === req.params.userId /*||
    req.currentUser?.roles.includes(userRoles.ADMIN)*/) {
        return next();
    }
    throw new forbidden_error_1.NotAuthorizedError();
};
exports.userSecurity = userSecurity;
const taskSecurity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("============ Task Security Handler =============");
    const task = yield prisma.task.findUnique({
        where: { id: req.params.taskId },
    });
    prisma.$disconnect();
    if (task) {
        if (((_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id) === task.userId /*||
        req.currentUser?.roles.includes(userRoles.ADMIN)*/) {
            return next();
        }
        return next(new forbidden_error_1.NotAuthorizedError());
    }
    return next(new not_found_error_1.NotFoundError("Task"));
});
exports.taskSecurity = taskSecurity;
/*export const invoiceSecurity = async (req: Request, res: Response, next: NextFunction) => {
  const invoice = await prisma.invoice.findUnique({
    where: { id: req.params.invoiceId },
    include: { customer: {
      include: { user: true }
    }}
  });

  await prisma.$disconnect();
  // const { customerId } = req.body || { customerId: invoice?.customerId };
  const customerId = req.body.customerId ? req.body.customerId : invoice?.customerId;
  // console.log(customerId);
  const index = req.currentUser?.customers.findIndex( (customer: Customer) => customer.id === customerId);
  // console.log(index);
  if(invoice) {
    if (req.currentUser && (req.currentUser.id === invoice.customer.user.id) && (index! >= 0)) {
      return next();
    }
  }
  // console.log(invoice?.customer.user.id);
  return next(new NotAuthorizedError())
};*/
var role_hierarchy;
(function (role_hierarchy) {
    role_hierarchy["ROLE_USER"] = "0";
    role_hierarchy["ROLE_INVOICER"] = "ROLE_USER";
    role_hierarchy["ROLE_ADMIN"] = "ROLE_INVOICER";
})(role_hierarchy = exports.role_hierarchy || (exports.role_hierarchy = {}));
var userRoles;
(function (userRoles) {
    // ROLE_DEMO = "ROLE_DEMO",
    // ROLE_USER = "ROLE_USER",
    // ROLE_INVOICER = "ROLE_INVOICER",
    // ROLE_ADMIN = "ROLE_ADMIN",
    userRoles["DEMO"] = "DEMO";
    userRoles["USER"] = "USER";
    userRoles["INVOICER"] = "INVOICER";
    userRoles["ADMIN"] = "ADMIN";
})(userRoles = exports.userRoles || (exports.userRoles = {}));
const validate = (type) => {
    return (req, res, next) => {
        switch (type) {
            case "owner":
                const owner = req.params;
                break;
            default:
                break;
        }
    };
};
//# sourceMappingURL=access-control.js.map